<template>
  <div id='app'>
    <h1 class="title">{{ title }}</h1>
    <ViewToggler @show-view="onToggleClick"/>
    <Standings :class="{ 'hide-view': hidePlayerStandings }" :standings="playerStandings"/>
    <!-- <h2 :class="{ 'hide-view': hideTeamStandings }">Team Standings View Placeholder</h2> -->
    <TeamStandings :class="{ 'hide-view': hideTeamStandings }" :standings="teamStandings"/>
  </div>
</template>

<script>
import Standings from './components/Standings'
import TeamStandings from './components/TeamStandings'
import playerData from './data/players.json'
import ViewToggler from './components/ViewToggler'
import axios from 'axios'
import mixins from './mixins'

export default {
  name: 'NFLWinsPool',
  components: {
    Standings,
    TeamStandings,
    ViewToggler
  },
  mixins: [mixins],
  data: function () {
    return {
      apiLocation: `https://api.sportsdata.io/v3/nfl/scores/json/Standings/2019?key=${ process.env.VUE_APP_SPORTSDATA_API_KEY }`,
      title: 'NFL Wins Pool',
      teams: [],
      players: playerData,
      hidePlayerStandings: false,
      hideTeamStandings: true,
      theme: 'default-theme'
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
    },
    parseData: function (data) {
      for (let team of data) {
        this.teams.push({
          team: team.Team,
          name: team.Name,
          conf: team.Conference,
          div: team.Division,
          win: team.Wins,
          tie: team.Ties,
          loss: team.Losses
        })
      }

      this.teams.sort(mixins.sortStandings)
    },
    onToggleClick: function (value) {
      if (value === 'player-view') {
        this.hidePlayerStandings = false
        this.hideTeamStandings = true
      } else if (value === 'team-view') {
        this.hidePlayerStandings = true
        this.hideTeamStandings = false
      }
    }
  },
  computed: {
    playerStandings: function () {
      const standings = this.players
      for (const team of this.teams) {
        for (const player of Object.keys(this.players)) {
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
    }
  },
  mounted () {
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
