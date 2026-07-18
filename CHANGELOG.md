# 更新日志 / Changelog

> 此文件会在文档构建前根据 Git tag 和版本变更自动生成。
> This file is generated before the documentation build from Git tags and release changes.

## v0.2.6 - 2026-07-18

### 中文

- 同步了 Lucide 上游的部分图标更新。
- 新增 menu-open 图标并重新生成相关资源。
- 统一了业务图标的尺寸，提升视觉一致性。
- 修正文档中的图标样式说明。
- 优化发布流程，提升文档部署与更新日志生成的稳定性。

### English

- Synced selected icon updates from the Lucide upstream.
- Added the menu-open icon and regenerated icon assets.
- Normalized business icon sizes for visual consistency.
- Aligned icon style descriptions in documentation.
- Stabilized documentation deployment and changelog generation in release process.

## v0.2.5 - 2026-07-17

### 中文

- 优化图标维护与图标选择 skills，补充本地脚本、发布、文档构建和缓存使用指引。
- 同步更新图标文档、业务图标指南和架构说明，保持资产规则与页面说明一致。
- 更新业务图标资源、命名和元数据，覆盖 filled、outlined 与 multicolor 等分类。
- 统一通用图标、业务图标和插画的命名规则，修正相关检测、修复和自动合并流程。
- 清理历史 review 文档和 changelog 数据，减少仓库维护噪音。

### English

- Improved icon maintenance and selection skills with guidance for local scripts, releases, docs builds, and cached lookup.
- Updated icon documentation, business icon guides, and architecture notes to match the current asset rules.
- Updated business icon assets, naming, and metadata across filled, outlined, and multicolor categories.
- Unified naming rules for generic icons, business icons, and illustrations, with matching validation, fix, and auto-merge flow updates.
- Cleaned up historical review documents and changelog data to reduce repository maintenance noise.

## v0.2.4 - 2026-07-17

### 中文

- 统一业务图标与插画资产的目录、命名、分类和元数据规则，完善生成与校验流程。
- 重整业务图标的 filled、outlined 和 multicolor 等类型，移除过时资源，并重新生成各框架包与导出入口。
- 更新 Figma 插件的图标同步与提交流程，调整文档界面，并支持按中英文名称搜索通用图标。
- 恢复 GitHub Actions 使用 Node.js、npm 和 pnpm，移除临时的 Nub 工具链集成。

### English

- Unified directory, naming, category, and metadata rules for business and illustration assets, with improved generation and validation workflows.
- Reorganized business icons into filled, outlined, multicolor, and other explicit variants, removed obsolete assets, and regenerated framework packages and exports.
- Updated icon synchronization and submission in the Figma plugin, refined the documentation UI, and added bilingual name search for generic icons.
- Restored GitHub Actions to Node.js, npm, and pnpm and removed the temporary Nub toolchain integration.

## v0.2.3 - 2026-07-13

### 中文

- 优化 release、npm 发布和文档部署链路，支持手动触发完整图标发布流程，并修复 GitHub App token 与自动合并稳定性问题。
- 升级包依赖和 GitHub Actions 版本，清理包构建产物、导出入口和 review 中发现的结构问题。
- 移除 name 快照数据，改进图标元数据、重名检测和远程数据同步流程。
- 完善插画图标体系，补充插画资源、文档详情页、搜索、列表和示例展示。
- 调整业务图标能力，支持描边宽度自定义、移除 mono 图标并清理 wrapper 后缀命名。
- 改进 Figma 插件的 GitHub 数据同步、图标名称规范化、重命名别名追踪和提交校验体验。
- 合并多批通用图标和插画源文件更新，并修复相关 SVG 规范化与格式校验流程。
- 修复代码审查中的关键、性能、数据完整性、Angular、React、Svelte 等框架问题，并补充测试基础设施。

### English

- Improved the release, npm publishing, and documentation deployment flow, including manual full icon release dispatch and more stable GitHub App token and auto-merge handling.
- Updated package dependencies and GitHub Actions versions, and cleaned up package build outputs, export entries, and structural review findings.
- Removed name snapshot data and improved icon metadata, duplicate-name detection, and remote data synchronization flows.
- Expanded the illustration icon system with new illustration assets, detail pages, search, list, and usage examples.
- Adjusted business icon capabilities with stroke width customization, mono icon removal, and wrapper suffix cleanup.
- Improved the Figma plugin GitHub data sync, icon name normalization, renamed alias tracking, and submission validation experience.
- Merged multiple batches of generic icon and illustration source updates, with related SVG normalization and format validation fixes.
- Fixed critical, performance, data integrity, Angular, React, and Svelte issues from code review, and added test infrastructure.

## v0.2.2 - 2026-07-01

### 中文

- 新增插画图标工作流支持。
- Figma 插件中放大选中图标预览。
- 移除部分图标并重构业务图标按颜色模式拆分。
- 修复双色业务图标预览渲染问题。
- 优化构建流程和文档。

### English

- Added support for the illustration icon workflow.
- Enlarged selected icon previews in the Figma plugin.
- Removed some icons and restructured business icons by color mode.
- Fixed rendering issues with duotone business icon previews.
- Improved build processes and documentation.

## v0.2.1 - 2026-06-29

### 中文

- 新增业务图标体系，收录 basic、chatbot、filled、filter、inbox、menu 等分类，并补齐 basic 业务 SVG 源文件。
- 发布业务图标数据与静态字体产物，补充 icons-data 与 icons-static 的业务图标导出和资源文件。
- 新增中英文业务图标文档、图标详情页和安装/静态资源使用指南。
- 增强 Figma 插件提交流程，支持按普通图标和业务图标生成不同文件与审核说明。
- 优化业务 SVG 清洗、索引生成和 CI 校验，使业务图标按独立规则处理。

### English

- Added the business icon system with basic, chatbot, filled, filter, inbox, and menu categories, including the basic business SVG sources.
- Published business icon data and static font artifacts, adding business icon exports and assets for icons-data and icons-static.
- Added bilingual business icon documentation, icon detail pages, and installation/static asset guides.
- Enhanced the Figma plugin submission flow to generate different files and review notes for generic icons and business icons.
- Improved business SVG cleanup, index generation, and CI validation so business icons use their own rules.

## v0.2.0 - 2026-06-29

### 中文

- 新增业务图标分类，添加了19个新图标
- 移除部分图标，包括设置轮廓图标和业务图标
- 引入Figma插件，支持图标同步
- 优化构建工具链，升级Vite
- 改进CI/CD流程，提升发布稳定性

### English

- Added categorized business icons with 19 new icons
- Removed several icons including settings-outlined and business icons
- Introduced Figma plugin for icon synchronization
- Optimized build toolchain with Vite upgrade
- Improved CI/CD workflows for more stable releases

## v0.1.12 - 2026-06-21

### 中文

- 改进 Astro 示例测试的容器配置，避免默认容器相关警告。

### English

- Improved the Astro example test container configuration to avoid default-container warnings.

## v0.1.11 - 2026-06-21

### 中文

- 修复 Astro 测试中的废弃用法警告，减少测试输出噪音。

### English

- Removed an Astro test deprecation warning to keep test output cleaner.

## v0.1.10 - 2026-06-21

### 中文

- 继续清理 release 相关 warning 输出，使构建日志更聚焦真实问题。

### English

- Further cleaned release warning output so build logs focus on actionable issues.

## v0.1.9 - 2026-06-21

### 中文

- 稳定 release 与 GitHub Pages workflow 的 warning 处理，提升自动化流程可读性。

### English

- Stabilized warning handling in release and GitHub Pages workflows for clearer automation logs.

## v0.1.8 - 2026-06-21

### 中文

- 清理 release workflow 中的无效警告输出，减少 Actions 日志噪音。

### English

- Cleaned up unnecessary release workflow warnings to reduce GitHub Actions log noise.

## v0.1.7 - 2026-06-21

### 中文

- 调整 release 后的文档部署触发方式，避免发布包和文档部署流程脱节。

### English

- Adjusted the post-release documentation deployment trigger so package publishing and docs deployment stay connected.

## v0.1.6 - 2026-06-21

### 中文

- 优化 GitHub Pages 构建流程，固定 base、关闭可选产物并减少构建资源压力。
- 补齐双语图标元数据、README 和指南侧栏顺序。
- 修复包构建输出和文档示例稳定性。

### English

- Optimized the GitHub Pages build with a fixed base, optional output switches, and lower build pressure.
- Completed bilingual icon metadata, README files, and guide sidebar ordering.
- Fixed package build outputs and improved documentation example stability.

## v0.1.5 - 2026-06-19

### 中文

- 修复静态资源示例和版本要求文档，使示例与实际包输出保持一致。

### English

- Fixed static asset examples and version requirement documentation to match the actual package outputs.

## v0.1.4 - 2026-06-19

### 中文

- 补充 YCloud Icons 基于 Lucide 二次开发的来源说明。
- 修复 release 版本元数据，保证文档和发布版本展示一致。

### English

- Clarified that YCloud Icons is developed from Lucide while preserving required attribution.
- Fixed release version metadata so documentation and published versions stay aligned.

## v0.1.3 - 2026-06-19

### 中文

- 将 packages 目录调整为与 npm 包短名一致，降低包路径和发布配置的映射成本。
- 重组架构与图标维护文档，补充面向维护者和代理流程的说明。
- 修复 GitHub Pages base 路径下的图标详情导航、内部跳转和更新日志侧栏。

### English

- Aligned package directories with npm package short names to reduce path and release mapping overhead.
- Reorganized architecture and icon maintenance documentation for maintainers and agent workflows.
- Fixed icon detail navigation, internal links, and changelog sidebar behavior under the GitHub Pages base path.

## v0.1.2 - 2026-06-19

### 中文

- 调整文档部署流程，使 release 后可以从 main 触发 GitHub Pages 部署。

### English

- Adjusted the documentation deployment flow so GitHub Pages can deploy from main after releases.

## v0.1.1 - 2026-06-19

### 中文

- 更新文档品牌资产，统一安装命令使用最新版本。
- 为全部图标包接入 npm Trusted Publishing 发布流程。

### English

- Refreshed documentation branding assets and standardized installation commands on the latest version.
- Added npm Trusted Publishing support for all icon packages.

## v0.1.0 - 2026-06-19

### 中文

- 发布首个正式版本，包含多框架图标包、静态资源包和基础文档站。

### English

- Published the first stable release with framework icon packages, static assets, and the initial documentation site.
