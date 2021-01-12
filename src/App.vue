<template>

  <div class="wrapper">

    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">
              Users CRM
            </div>
            <ul class="navbar-list">
              <li class="navbar-item" v-for="link in links" :key="link.title">
                <router-link href="" class="navbar-link" :title="link.title" :to="link.url">{{ link.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <router-view></router-view>

    <footer></footer>

  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  data() {
    return {
      links: [
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Users',
          url: '/Users'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.navbar-link{
  &.router-link-exact-active{
    color: rgb(252, 0, 0);
  }
}
  
</style>
