<template>
  <div id='app'>
    <h1 class="title">{{ title }}</h1>
    <view-toggler @show-view="onViewToggleClick" @select-theme="onThemeToggleClick"/>
    <component :is="visibleComponent.instance" :standings="visibleComponent.prop"/>
    <footer-component/>
  </div>
</template>

<script>
import axios from 'axios'
import mixins from './mixins'

const ViewToggler = () => import(/* webpackChunkName: "view-toggler" */ '@/components/ViewToggler')
const Footer = () => import(/* webpackChunckName: "footer" */ '@/components/Footer')
import PLAYER_DATA from './data/players.json'

export default {
  name: 'NFLWinsPool',
  components: {
    'view-toggler': ViewToggler,
    'footer-component': Footer
  },
  mixins: [ mixins ],
  data: function () {
    return {
      apiLocation: process.env.VUE_APP_API_LOCATION,
      title: 'NFL Wins Pool',
      playerStandings: PLAYER_DATA,
      activeTheme: 'default-theme',
      activeComponent: 'player-view',
      nflTeamStandingsStore: {}
    }
  },
  watch: {
    activeTheme: {
      handler: 'swapThemes'
    },
    nflTeamStandingsStore: {
      immediate: true,
      deep: true,
      handler: 'buildPlayerStandings'
    }
  },
  methods: {
    getStandings: function () {
      axios.get(this.apiLocation)
        .then(data => this.parseData(data.data))
        .then(teams => this.nflTeamStandingsStore = teams)
    },
    parseData: function (data) {
      const tmpObj = {}
      for (let team of data) {
        tmpObj[team.Team] = {
          team: team.Team,
          name: team.Name,
          conf: team.Conference,
          div: team.Division,
          win: team.Wins,
          tie: team.Ties,
          loss: team.Losses
        }
      }
      return tmpObj
    },
    onViewToggleClick: function (value) {
      this.activeComponent = value;
    },
    onThemeToggleClick: function (value) {
      this.activeTheme = value;
    },
    buildPlayerStandings: function () {
      const standings = this.playerStandings
      for (const team of this.sortedTeamStandings) {
        for (const player of this.playerStandings) {
          if (player.draft.includes(team.team)) {
            const index = player.standings.findIndex(x => x.team === team.team)
            if (index >= 0) {
              player.standings.splice(index, 1)
            }
            player.standings.push(team)
          }
        }
      }

      this.playerStandings =  Object.values(standings).map(player => {
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
    swapThemes: function (newTheme, oldTheme) {
      document.getElementById('doc-body').classList.add(newTheme)
      document.getElementById('doc-body').classList.remove(oldTheme)
    }
  },
  computed: {
    sortedTeamStandings: function () {
      return Object.values(this.nflTeamStandingsStore).sort(mixins.sortStandings)
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
