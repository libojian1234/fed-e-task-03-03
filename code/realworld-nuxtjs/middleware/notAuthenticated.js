/**
 * 验证是否登录的中间件
 */

export default function ({ store, redirect }) {
    // If the user is authenticated, redirect to home page
    if (store.state.user) {
      return redirect('/')   // redirect 重定向方法
    }
  }