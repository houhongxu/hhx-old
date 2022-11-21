# 面试

- 为了面试的所有准备与总结，将面试相关问题在本项目内逐一实现
- turborepo 集合了所有项目方便更新

## TODO

- [x] turborepo 初始化
- [x] client 初始化
- [x] 迁移博客到 apps/docs
- [x] yarn 迁移为 pnpm
- [ ] api 初始化 create-koa-cli
- [ ] 腾讯云部署
- [ ] CICD
- [ ] ui 初始化(参考 antd)
- [ ] hooks 初始化(参考 ahooks)
- [ ] 迁移博客到个人项目（对文档进行分类，比如学习笔记等）

### api 初始化脚手架 ing

由于项目初期后端未使用成熟框架如 nestjs，midwayjs 等，所以自己搭建脚手架减少重复的初始化工作

## 依赖选型

偏向于公司已经在使用的技术

- yarn（pnpm 迁移成本低，所以迁移）
- turborepo
- tcb
- umi
- koa
- ts

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
- doc 文档（能力有限暂时只能是 README 了）

## TOLEARN

- [ ] ts 重写 axios
- [ ] create-koa-cli
- [ ] serverless,ncc,rollup,tsup 选型后端打包工具
- [ ] 高德地图 api 封装
