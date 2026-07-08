# 批量修复方案

**策略**: 将 Top 30 问题分成 6 个主题 PR,每个 PR 包含相关的修复

---

## PR #1: 构建系统核心修复 (P0) - 已部分完成

**优先级**: 🔴 Critical  
**预计工作量**: 2-3 小时  
**测试要求**: 完整构建测试

### 包含的修复

- [x] #1: 文件写入 + 错误处理 (F5 + F12) ✅
- [x] #2: JSON import 缓存失效 (F13) ✅
- [ ] #3: JSON 解析运行时校验
- [ ] 构建脚本 #3: 文件系统竞态条件
- [ ] 构建脚本 #5: 无限递归风险

**影响**: 修复构建正确性,防止静默失败

---

## PR #2: CI/CD 安全加固 (P0)

**优先级**: 🔴 Critical  
**预计工作量**: 1-2 小时  
**测试要求**: Workflow 测试

### 包含的修复

- [ ] #4: CI Secret 安全处理
- [ ] #5: Repository 硬编码检查(所有敏感 workflow)
- [ ] #7: 固定 Action 版本到 commit SHA
- [ ] #21: 添加 timeout(auto-merge + ci.yml)
- [ ] CI: 添加 permissions 声明

**影响**: 防止 Secret 泄漏、Fork 误操作、超时挂起

---

## PR #3: 发布包安全和 SSR 修复 (P0)

**优先级**: 🔴 Critical  
**预计工作量**: 2-3 小时  
**测试要求**: SSR 测试、浏览器测试

### 包含的修复

- [ ] #6: Angular XSS 防护(Renderer2 属性白名单)
- [ ] #8: 补充 icons-static sprite.svg
- [ ] #9: icons 添加 SSR document 检查
- [ ] #10: hasA11yProp 修复原型链污染

**影响**: 修复 XSS 漏洞、SSR 崩溃、无障碍误判

---

## PR #4: 性能优化核心 (P1)

**优先级**: 🟠 High  
**预计工作量**: 3-4 小时  
**测试要求**: 性能基准测试

### 包含的修复

- [ ] #11: mergeClasses 统一使用 Set 去重(icons + icons-shared)
- [ ] #12: icons querySelectorAll 性能优化
- [ ] #13: React Native customAttrs useMemo 优化
- [ ] #14: icons-data 体积优化(source maps + 别名精简)

**影响**: 大幅提升渲染性能和包体积

---

## PR #5: React 生态修复 (P1)

**优先级**: 🟠 High  
**预计工作量**: 2-3 小时  
**测试要求**: React/Preact 测试

### 包含的修复

- [ ] #15: React 添加 displayName(DynamicIcon + Icon)
- [ ] #16: React useEffect 依赖和清理逻辑
- [ ] #20: React 添加 memo 优化
- [ ] Preact forwardRef 支持

**影响**: 修复内存泄漏、改善开发体验、提升性能

---

## PR #6: 多框架无障碍和类型修复 (P1)

**优先级**: 🟠 High  
**预计工作量**: 2-3 小时  
**测试要求**: A11y 测试、类型检查

### 包含的修复

- [ ] #17: Vue 实现 aria-hidden 自动管理
- [ ] #18: Solid 除零风险修复
- [ ] #19: Angular Peer Dependencies 版本修正
- [ ] #22: docs.yml 并发控制优化
- [ ] Svelte $props() 响应性修复

**影响**: 无障碍合规、类型安全、框架稳定性

---

## PR #7: 测试基础设施 (P1)

**优先级**: 🟠 High  
**预计工作量**: 4-5 小时  
**测试要求**: 新测试通过

### 包含的修复

- [ ] #23: icons-static 添加基础测试
- [ ] #24: 集成 axe-core 进行 A11y 测试
- [ ] #25: 设置覆盖率阈值(最低 60%)
- [ ] 减少快照测试依赖
- [ ] 创建 test-utils 共享包

**影响**: 建立测试基础,防止回归

---

## 实施计划

### Week 1
- **Day 1**: PR #1 构建系统核心修复(已完成 2/5)
- **Day 2**: PR #2 CI/CD 安全加固
- **Day 3**: PR #3 发布包安全和 SSR 修复

### Week 2
- **Day 1**: PR #4 性能优化核心
- **Day 2**: PR #5 React 生态修复
- **Day 3**: PR #6 多框架无障碍和类型修复

### Week 3
- **Day 1-2**: PR #7 测试基础设施
- **Day 3**: 验证所有 PR,准备发布

---

## 总进度

- **总修复数**: 30 个关键问题
- **已完成**: 2 个 (7%)
- **预计总工作量**: 16-20 小时
- **预计完成时间**: 3 周

