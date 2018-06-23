<template>
  <div id="record_div">
    <div>
      <img :src="tierImg" />
    </div>
    <div>
      <div>소환사명 : <label>{{userName}}</label></div>
      <div>소환사 레벨 : <label>{{level}}</label></div>
      <div>티어 : <label>{{tier}} {{rank}}</label></div>
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
  props : ['searchUserName'],
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
      tierImg: null,
      url: '/apiCall'
    }
  },
  methods: {
    apiCall: function () {
      let userNm = this.searchUserName
      let self = this // data객체의 this

      axios.get(`${this.url}?userName=${userNm}`)
        .then(function (response) {
          let dataObj = response.data
          if (dataObj.statusCode == 404) return false
          let date = new Date(dataObj.revisionDate)
          self.userName = dataObj.name
          self.revisionDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
          self.level = dataObj.summonerLevel
          let leagueObj = dataObj.LeagueList
          if(Object.keys(leagueObj).length > 0){
            let soloLeague = leagueObj.SOLO
            self.leagueName = soloLeague.leagueName
            self.rank = soloLeague.rank
            self.tier = soloLeague.tier
            self.wins = soloLeague.wins
            self.losses = soloLeague.losses
          }else{
            self.leagueName = null
            self.rank = null
            self.wins = null
            self.losses = null
            self.tier = 'unranked'
          }

          // TIER IMG
          self.tierImg = require('../assets/' + self.tier.toLowerCase() + ".png")

        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () { // 최초 실행시
    this.apiCall()
  },
  watch: {
    // 부모로부터 받아온 props에 변경이 이루어질경우
    // 변경이 이루어진 변수에 이벤트를 준다.
    searchUserName : function (val){
      this.apiCall()
    }
  }
}

</script>

<style scoped>
#record_div{
  text-align: center;
}
</style>
