---
title: 图标维护
description: 在 YCloud Icons 仓库中添加、删除和修改图标的实际维护流程。
---

# 图标维护

这份文档只描述当前仓库里真实存在的维护流程，适用于日常的图标新增、删除和修改。

## 目录约定

- `icons/*.svg`：图标 SVG 源文件。
- `icons/*.json`：图标元数据，包含分类、标签、贡献者和中文信息。
- `categories/*.json`：分类定义，决定左侧分类展示、分类标题和分类图标。
- `docs/`：文档站点，图标详情页、分类页和搜索数据都由构建脚本自动生成。

一个图标必须同时具备这两份文件：

```text
icons/<icon-name>.svg
icons/<icon-name>.json
```

否则 `pnpm checkIcons` 会直接报错。

## 添加一个图标

### 1. 放入 SVG 源文件

把新图标放到 `icons/` 目录，文件名使用 kebab-case，例如：

```text
icons/circle-arrow-up.svg
```

如果 SVG 来自设计工具导出，先执行一次清洗：

```sh
pnpm optimize
```

这个命令会遍历 `icons/` 下的 SVG，并按当前仓库的清洗规则重写。

### 2. 新建元数据 JSON

为图标补齐同名的 JSON 文件，例如：

```json
{
  "$schema": "../icon.schema.json",
  "contributors": ["your-github-id"],
  "use-cases": [],
  "tags": ["arrow", "up", "circle"],
  "categories": ["arrows", "navigation"],
  "i18n": {
    "zh": {
      "name": "圆形上箭头",
      "tags": ["箭头", "向上", "圆形"],
      "categories": ["箭头", "导航与地点"]
    }
  }
}
```

最低要求看 [icon.schema.json](/Users/tianjianjun/Projects/ycloud-lucide-icons/icon.schema.json)：

- 必填：`$schema`、`contributors`、`categories`、`tags`、`use-cases`
- 推荐补齐：`i18n.zh.name`、`i18n.zh.tags`、`i18n.zh.categories`

### 3. 校验分类是否存在

`categories` 字段里的每个值都必须能在 `categories/*.json` 里找到。

如果需要新增分类，除了增加分类文件，还要保证 `icon` 指向一个已存在的图标，例如：

```json
{
  "$schema": "../category.schema.json",
  "title": "Navigation & Places",
  "icon": "compass",
  "i18n": {
    "zh": {
      "title": "导航与地点"
    }
  }
}
```

### 4. 运行校验

至少执行下面几条命令：

```sh
pnpm checkIcons
pnpm lint:json
pnpm --dir docs docs:build:no-og
```

含义分别是：

- `pnpm checkIcons`：检查 `.svg` / `.json` 是否一一对应，分类是否有效
- `pnpm lint:json`：校验图标和分类 JSON 是否符合 schema
- `pnpm --dir docs docs:build:no-og`：验证文档站点、图标页、分类页和搜索索引是否都能生成

如果你改动了 React 产物或导出行为，额外跑：

```sh
pnpm --filter @ycloud-web/icons-react build
```

## 删除一个图标

删除图标时不要只删 SVG，必须成对清理：

```text
icons/<icon-name>.svg
icons/<icon-name>.json
```

然后继续检查下面几类引用：

- 其他图标的 `aliases`、弃用迁移信息是否还引用它
- `categories/*.json` 的 `icon` 字段是否把它当作分类图标
- 文档里的示例代码是否还在使用这个图标

删除后执行：

```sh
pnpm checkIcons
pnpm lint:json
pnpm --dir docs docs:build:no-og
```

如果删除的是分类图标，先把对应分类切换到别的已存在图标，否则分类页会直接报错。

## 修改一个图标

修改通常分三类，处理方式不同。

### 1. 只改 SVG 形状

只需要更新：

```text
icons/<icon-name>.svg
```

然后执行：

```sh
pnpm optimize
pnpm checkIcons
pnpm --dir docs docs:build:no-og
```

### 2. 只改名称、标签、分类或中文文案

只需要更新：

```text
icons/<icon-name>.json
```

常见修改包括：

- 调整 `tags`
- 调整 `categories`
- 补齐或修正 `i18n.zh`
- 增加 `aliases`

这类改动会直接影响：

- 图标搜索结果
- 图标详情页中文显示
- 分类页归属

所以至少执行：

```sh
pnpm checkIcons
pnpm lint:json
pnpm --dir docs docs:build:no-og
```

### 3. 重命名图标

重命名不是单纯改文件名，至少要同步下面四处：

- `icons/<old-name>.svg` -> `icons/<new-name>.svg`
- `icons/<old-name>.json` -> `icons/<new-name>.json`
- 如果要兼容旧名字，在新 JSON 里补 `aliases`
- 相关文档示例、分类图标引用、包导入示例一起更新

如果只是保留旧名字兼容，建议用 `aliases` 标记，而不是继续保留两份图标源。

## 建议的提交流程

日常维护建议按下面顺序执行：

```sh
pnpm optimize
pnpm checkIcons
pnpm lint:json
pnpm --dir docs docs:build:no-og
```

如果修改影响到了发布包的导出，再补对应包构建，例如：

```sh
pnpm --filter @ycloud-web/icons-react build
pnpm --filter @ycloud-web/icons-vue build
```

## 发布后的表现

图标维护合入 `main` 后：

1. 文档站点构建会重新生成图标页、分类页和搜索数据
2. 如果后续通过 tag 发布，发布流会以 tag 作为版本源
3. 发布成功后，workflow 会把各个 `packages/*/package.json` 的版本回写到 `main`

这意味着：

- 日常图标改动不需要手动改包版本
- 真正发布时由 tag 驱动版本
- 仓库内版本文件会在发布成功后自动与 tag 对齐
