<template>
    <div id="home_div">
      <img src="../assets/lol_logo.jpg">
      <div>
        <input type="text" size="50" v-model="userName" @keyup.enter="search" />
        <button v-on:click="search"  >검색</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    search () {
      const param = 'userName=' + this.userName
      location.href = '/#/record?' + param
    }
  },
  created () {
    console.log($.fn.jquery)
  }
}
</script>

<style scoped>
#home_div{
  text-align: center;
}
</style>
