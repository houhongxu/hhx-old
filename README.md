# 面试

- 为了面试的所有准备与总结，将面试相关问题在本项目内逐一实现
- turborepo 集合了所有项目方便更新

## TODO

- [x] turborepo 初始化
- [x] client 初始化
- [x] 迁移博客到 apps/docs
- [x] yarn 迁移为 pnpm
- [x] 与面试题无关的项目，需要发包的项目，分离出去
- [ ] 腾讯云部署
- [ ] CICD
- [ ] 迁移博客到个人项目（对文档进行分类，比如学习笔记等）并支持 mdx
- [ ] 面试题每一个进行总结输出

## 依赖选型

偏向于公司已经在使用的技术

- yarn（pnpm 迁移成本低，所以迁移）
- turborepo
- tcb
- umi
- koa
- ts
- nextjs

## 规范

### gitignore

每个包都应该有独立 gitignore，以免有文件疏漏

### 提交信息规范

采用比较多的是 Angular 规范

格式为：
`<type>(<scope>): <subject>`

不在具体包内则为 all

type 则依据 Angular 规范微调

- feat 实现新功能
- fix 修复问题
- chore 无法归类的杂项
- refactor 重构
- test 测试
- perf 性能优化
- docs 文档

还有 commitlint 规范

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

## TOLEARN

- [ ] ts 重写 axios
- [ ] create-koa-cli
- [ ] serverless,ncc,rollup,tsup 选型后端打包工具
- [ ] 高德地图 api 封装

## 功能规划

### 面试题目的最小实现合集

使用单独页面进行展示
可以混合使用 mdx 进行组件库展示

### 记录业务的库选型
