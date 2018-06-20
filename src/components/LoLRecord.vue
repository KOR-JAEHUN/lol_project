<template>
  <div id="record_div">
    <span>
      <input type="text" size="50" v-model="userName" />
    </span>
    <span>
      <input type="button" value="검색" @click="apiCall" />
    </span>
    <div>
      <span>소환사명 : <label>${{userName}}</label></span>
      <span>티어 : <label>${{userName}}</label></span>
      <span>소환사 레벨 : <label>${{userName}}</label></span>
      <span>소환사명 : <label>${{userName}}</label></span>
      <span>최근 수정일 : <label>${{userName}}</label></span>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'LoLRecord',
  data () {
    return {
      userName: null,
      url: '/apiCall'
    }
  },
  methods: {
    apiCall () {
      axios.get(`${this.url}?userName=${this.userName}`)
        .then(function (response) {
          let data = response
          console.log(data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    this.userName = this.$route.query.userName
  },
  mounted () {
    this.methods.apiCall()
  }
}

</script>

<style scoped>
#record_div{
  text-align: center;
}
</style>
