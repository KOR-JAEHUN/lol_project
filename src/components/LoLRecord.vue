<template>
  <div id="record_div">
    <span>
      <input type="text" size="50" id="userNmInput" :value="userName"/>
    </span>
    <span>
      <input type="button" value="검색" @click="reSearch" />
    </span>
    <div>
      <div>소환사명 : <label>{{userName}}</label></div>
      <div>티어 : <label>{{tier}} {{rank}}</label></div>
      <div>소환사 레벨 : <label>{{level}}</label></div>
      <div>리그명 : <label>{{leagueName}}</label></div>
      <div>승리횟수 : <label>{{wins}}</label></div>
      <div>패배횟수 : <label>{{losses}}</label></div>
      <div>최근 수정일 : <label>{{revisionDate}}</label></div>
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
      level: null,
      leagueName: null,
      rank: null,
      tier: null,
      wins: null,
      losses: null,
      revisionDate: null,
      url: '/apiCall'
    }
  },
  methods: {
    apiCall: function () {
      let userNm = $('#userNmInput').val()
      let self = this // data객체의 this
      axios.get(`${this.url}?userName=${userNm}`)
        .then(function (response) {
          let dataObj = response.data
          if (dataObj.statusCode !== 404) {
            let leagueObj = dataObj.LeagueList
            let soloLeague = leagueObj.SOLO
            self.level = dataObj.summonerLevel
            self.leagueName = soloLeague.leagueName
            self.rank = soloLeague.rank
            self.tier = soloLeague.tier
            self.wins = soloLeague.wins
            self.losses = soloLeague.losses
            self.name = dataObj.name
            let date = new Date(dataObj.revisionDate)
            self.revisionDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
          } else {
            return false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    reSearch: function () {
      const param = 'userName=' + $('#userNmInput').val()
      location.href = '/#/record?' + param
      this.userName = this.$route.query.userName
      this.apiCall()
    }
  },
  created () {
    this.userName = this.$route.query.userName
  },
  mounted () {
    this.apiCall()
  }
}

</script>

<style scoped>
#record_div{
  text-align: center;
}
</style>
