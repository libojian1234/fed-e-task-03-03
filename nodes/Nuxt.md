Nuxt.js 异步数据 —— asyncData 方法

- 看官方文档 https://zh.nuxtjs.org/guide/async-data
- 基本用法
  - 它会将 asyncData 返回的数据融合组件 data 方法返回数据一并给组件
  - 调用时机：服务端渲染期间和客户端路由更新之前
- 注意事项
  - 只能在页面组件中使用
  - 没有 this，因为它是在组件初始化之前被调用的