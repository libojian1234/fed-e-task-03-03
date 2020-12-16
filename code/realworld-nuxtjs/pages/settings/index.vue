<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="newUser.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="newUser.username"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="newUser.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="newUser.email"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="newUser.password"
                  required
                  minlength="8"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>

          <!-- Line break for logout button -->
        <hr>

        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { settings } from "@/api/user";
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  // 在路由匹配组件渲染直接会执行中间件处理
  middleware: "authenticated",
  name: "settings",
  computed: {
    ...mapState(["user"])
  },
  data () {
    return {
      newUser: {
        image: '',
        bio: '',
        username:'',
        email:'',
        password:''
      }
    }
  },
  mounted(){
    this.newUser.image = this.user.image
    this.newUser.bio = this.user.bio ? this.user.bio : '' 
    this.newUser.username = this.user.username
    this.newUser.email = this.user.email
  },
  methods: {
    async onSubmit() {
      try {
        // 提交表单请求登录
        const { data } = await settings({
              user: this.newUser
            })
          debugger
        console.log(data);

        // TODO: 保存用户的登录状态
        this.$store.commit("setUser", data.user);

        // 为了防止刷新页面数据丢失，我们需要把数据持久化
        Cookie.set("user", data.user);

        // 跳转到首页
        this.$router.push("/");
      } catch (error) {
        //   console.dir('请求失败', err)
        this.errors = error.response.data.errors;
      }
    },
    logout () {
      // TODO: 清除保存用户的登录状态
        this.$store.commit("setUser", '');

        // 清除cookie
        Cookie.remove('user');

        // 跳转到首页
        this.$router.push("/");
    }
  }
};
</script>

<style>
</style>