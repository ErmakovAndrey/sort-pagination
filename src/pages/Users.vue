<template>
  <div class="wrapper-content wrapper-content--fixed">

      <section>

        <div class="container">

          <h1>Users page</h1>

          <div class="length-wraper">
            <span>
              Change length value: 
            </span>
            <select name="lenght" v-model="page.length" class="lenght-input">
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th @click="sort('username')">User name <span class="sort-arrow" v-bind:class="[currentSort === 'username' ? 'active': '', currentSortDir]"></span></th>
                <th @click="sort('name')">Name <span class="sort-arrow" v-bind:class="[currentSort === 'name' ? 'active': '', currentSortDir]"></span></th>
                <th @click="sort('email')">Email <span class="sort-arrow" v-bind:class="[currentSort === 'email' ? 'active': '', currentSortDir]"></span></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in userSort" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>

          <p>
            debug: sort {{ currentSort }}, dir: {{ currentSortDir }}
          </p>

        </div>

      </section>

      <section>
        <div class="container">
          <div class="button-list">
            <div class="btn btnPrimary" @click="prevPage">&#8592;</div>
            <span>{{ this.page.current }}/{{ pagesCount }}</span>
            <div class="btn btnPrimary" @click="nextPage">&#8594;</div>
          </div>
        </div>
      </section>

    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      currentSort: 'username',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 3
      }
    }
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then( response => {
      this.users = response.data
    }).catch(err => {
      console.log('get data received: ' + err)
    })
  },
  computed: {
    userSort() {
      return this.users.sort((a, b) => {
        let mod = 1
        if (this.currentSortDir === 'desc') mod = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod
        if (a[this.currentSort] > b[this.currentSort]) return 1 * mod
        return 0
      }).filter( (row, index) => {
        let start = (this.page.current - 1) * this.page.length
        let end = this.page.length * this.page.current
        if (index >= start && index < end) return true
      })
    },
    pagesCount() {
      return Math.ceil(this.users.length/this.page.length)
    },

  },
  methods: {
    sort(e) {
      if (e == this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      else {
        this.currentSort = e
        this.currentSortDir = 'asc'
      }
    },
    prevPage() {
      if (this.page.current > 1) {
        this.page.current -= 1
      }
     },
    nextPage() {
      if( (this.page.current * this.page.length) < this.users.length) {
        this.page.current += 1
      } 
    }
  }
}
</script>

<style lang="scss" scoped>
.length-wraper{
  display: flex;
  justify-content: flex-end;
}
.lenght-input{
  margin:0 20px;
  padding:5px 10px;
}
.button-list{
  text-align: center;
  width: 100%;

  .btn {
    border-radius: 50px;
    margin:0 20px;
  }
}
.sort-arrow{
  &:before{
    content: '↓';
    color: #ccc;
  }
  &.active:before{
    color: #000;
  }
  &.active.desc:before{
    content: '↑';
  }
}
</style>
