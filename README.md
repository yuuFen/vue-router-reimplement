# 超级化简版 vue-router 

> [详见博客](https://yuufen.com/blog/post/8pW7fVIsz/)
> 
> 原版实现更更更更值得学习
>
> [vue-router](https://github.com/vuejs/vue-router)
>
> [router-view](https://github.com/vuejs/vue-router/blob/dev/src/components/view.js)

## 预览
```
yarn install
yarn serve
```

## 实现

```js
// install 时获取
let Vue

// hash 改变 => current (响应式)改变 => router-view 的 render 改变
export default class VueRouter {
  constructor(options) {
    this.$options = options

    // 用来保存 path 和 route 的映射
    this.routeMap = {}

    // 利用 Vue 让 current 实现响应式
    this.app = new Vue({
      data: {
        current: '/',
      },
    })
  }

  init() {
    // 绑定浏览器事件
    this.bindEvents()

    // 解析路由配置
    this.createRouteMap(this.$options)

    // 创建 router-link 和 router-view
    this.initComponent()
  }

  bindEvents() {
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap(options) {
    options.routes.forEach((item) => {
      this.routeMap[item.path] = item
    })
  }
  initComponent() {
    Vue.component('router-link', {
      props: {
        to: String,
      },
      render(h) {
        // 目标：<a :href="to">doooo</a>
        // 这里 this 指向 router-link 组件实例
        return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
        // return <a href={this.to}>{this.$slots.default}</a>
      },
    })
    Vue.component('router-view', {
      // 箭头函数可以保留 this 指向，所以这里指向 VueRouter 实例
      render: (h) => {
        // console.log(this.app.current)
        // console.log(this.routeMap)
        // console.log(this.routeMap[this.app.current])
        const Comp = this.routeMap[this.app.current].component
        return h(Comp)
      },
    })
  }
}

VueRouter.install = function(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      // 每个组件 beforeCreate 的时候都会执行
      // 但是这里只希望在根组件上执行一次
      // this 指向 Vue 组件实例
      // this.$options.router 就是在 router.js 中 new 的 VueRouter 实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    },
  })
}
```

## 分析

### 使用场景

```js
import Vue from 'vue'
import VueRouter from '../utils/router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/main', component: Main },
    { path: '/about', component: About },
  ],
})
```

```js
// ...

import router from './router'

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
```

```html
    <router-link to="/">Home</router-link>
    <router-link to="/main">Main</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
```
