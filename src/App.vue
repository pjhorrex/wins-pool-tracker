<template>
  <div id='app'>
    <h1 class="title">{{ title }}</h1>
    <view-toggler @show-view="onToggleClick"/>
    <component :is="visibleComponent.instance" :standings="visibleComponent.prop"/>
  </div>
</template>

<script>
import axios from 'axios'
import mixins from './mixins'

const ViewToggler   = () => import(/* webpackChunkName: "view-toggler" */ '@/components/ViewToggler.vue')
import PLAYER_DATA from './data/players.json'

export default {
  name: 'NFLWinsPool',
  components: { 'view-toggler': ViewToggler },
  mixins: [ mixins ],
  playerData: PLAYER_DATA,
  teamData: [],
  data: function () {
    return {
      apiLocation: `https://api.sportsdata.io/v3/nfl/scores/json/Standings/2019?key=${ process.env.VUE_APP_SPORTSDATA_API_KEY }`,
      title: 'NFL Wins Pool',
      teams: [],
      hidePlayerStandings: false,
      hideTeamStandings: true,
      theme: 'default-theme',
      activeComponent: 'player-view'
    }
  },
  watch: {
    theme: function (newTheme, oldTheme) {
      document.getElementById('doc-body').classList.add(newTheme)
      document.getElementById('doc-body').classList.remove(oldTheme)
    }
  },
  methods: {
    getStandings: function () {
      axios.get(this.apiLocation)
        .then(data => this.parseData(data.data))
        .then(data => this.teams = data)
    },
    parseData: function (data) {
      const newData = []

      for (let team of data) {
        newData.push({
          team: team.Team,
          name: team.Name,
          conf: team.Conference,
          div: team.Division,
          win: team.Wins,
          tie: team.Ties,
          loss: team.Losses
        })
      }

      return newData.sort(mixins.sortStandings)
    },
    onToggleClick: function (value) {
      this.activeComponent = value;
    }
  },
  computed: {
    playerStandings: function () {
      const standings = this.$options.playerData
      for (const team of this.teams) {
        for (const player of Object.keys(this.$options.playerData)) {
          if (standings[player].draft.includes(team.team)) {
            standings[player].standings.push(team)
          }
        }
      }

      return Object.values(standings).map(player => {
        player.win = 0
        player.loss = 0
        player.tie = 0

        for (const team of player.standings) {
          player.win += team.win
          player.loss += team.loss
          player.tie += team.tie
        }

        return player
      }).sort(mixins.sortStandings)
    },
    teamStandings: function () {
      const teamStandings = []

      for (const player of this.playerStandings) {
        player.standings.forEach(team => {
          team.player = {}
          team.player.id = player.id
          team.player.name = player.name
          const draftPickId = player.draft.indexOf(team.team)
          team.pickNumber = player.draftpicks[draftPickId]

          teamStandings.push(team)
        })
      }

      return teamStandings.sort((a, b) => {
        if (a.pickNumber < b.pickNumber) {
          return 1
        } else if (a.pickNumber > b.pickNumber) {
          return -1
        }
        return 0
      }).sort(mixins.sortStandings).map((team, index) => {
        team.rankNumber = index + 1
        team.valueNumber = team.pickNumber - team.rankNumber
        return team
      })
    },
    visibleComponent: function () {
      let prop = null;
      let comp = null;
      if (this.activeComponent === 'player-view') {
        prop = this.playerStandings
        comp = () => import(/* webpackChunkName: "player-standings" */ '@/components/Standings')
      } else if (this.activeComponent === 'team-view') {
        prop = this.teamStandings
        comp = () => import(/* webpackChunkName: "team-standings" */ '@/components/TeamStandings')
      }

      return {instance: comp, prop: prop}
    }
  },
  beforeMount: function () {
    this.getStandings()
  }
}

</script>

<style lang="scss">
html {
  // background-color: $light;
  //color: $dark;
  font-family: $base-font-family;
  font-size: $base-font-size;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  font-size: 3.2em; // 32px

  &.title {
    text-transform: uppercase;
  }
}

#app {
  text-align: center;
}

.hide-view {
  display: none !important;
}

</style>
