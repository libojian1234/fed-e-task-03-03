### 什么是Vuex

- Vuex 是专门为 Vue.js 设计的状态管理库
- Vuex 采用集中式的方式存储需要共享的状态
- Vuex 的作用是进行状态管理，解决复杂组件通讯，数据共享
- Vuex 集成了 devtools 中，提供了 time-travel 时光 旅行历史回滚功能

### 什么情况下使用  Vuex

- 非必要的情况下不要使用 Vuex
- 大型的单页应用程序
  - 多个视图依赖于同一状态
  - 来自不同视图的行为需要变更同一状态

### Vuex 核心概念

- Store
- State
- Getter
- Mutation
- Action
- Module