<template>
  <div id='app'>
    <h1 class="title">{{ title }}</h1>
    <ViewToggler @show-view="onToggleClick"/>
    <Standings :class="{ 'hide-view': hidePlayerStandings }" :standings="standings"/>
    <h2 :class="{ 'hide-view': hideTeamStandings }">Team Standings View Placeholder</h2>
  </div>
</template>

<script>
import Standings from './components/Standings'
import ViewToggler from './components/ViewToggler'
import axios from 'axios'
import mixins from './mixins'

export default {
  name: 'NFLWinsPool',
  components: {
    Standings,
    ViewToggler
  },
  mixins: [mixins],
  data: function () {
    return {
      apiLocation: `https://api.sportsdata.io/v3/nfl/scores/json/Standings/2019?key=${ process.env.VUE_APP_SPORTSDATA_API_KEY }`,
      title: 'NFL Wins Pool',
      teams: [],
      players: {
        'FREMONT': {
          id: 'FREMONT',
          name: 'Fremont',
          draft: ['NO', 'CAR', 'BAL', 'MIA'],
          standings: [],
          draftpicks: [1, 17, 19, 32]
        },
        'EDGE': {
          id: 'EDGE',
          name: 'Edge',
          draft: ['PHI', 'SF', 'NYJ', 'CIN'],
          standings: [],
          draftpicks: [2, 16, 18, 31]
        },
        'PHIL': {
          id: 'PHIL',
          name: 'Phil',
          draft: ['NE', 'GB', 'IND', 'WAS'],
          standings: [],
          draftpicks: [3, 13, 23, 29]
        },
        'MARK': {
          id: 'MARK',
          name: 'Mark',
          draft: ['KC', 'PIT', 'JAX', 'NYG'],
          standings: [],
          draftpicks: [4, 12, 21, 28]
        },
        'CHRIS': {
          id: 'CHRIS',
          name: 'Chris',
          draft: ['LAR', 'CHI', 'BUF', 'TB'],
          standings: [],
          draftpicks: [5, 10, 24, 25]
        },
        'TEGAN': {
          id: 'TEGAN',
          name: 'Tegan',
          draft: ['LAC', 'DAL', 'DEN', 'DET'],
          standings: [],
          draftpicks: [6, 9, 22, 26]
        },
        'KEITH': {
          id: 'KEITH',
          name: 'Keith',
          draft: ['HOU', 'SEA', 'TEN', 'OAK'],
          standings: [],
          draftpicks: [7, 11, 20, 27]
        },
        'MIKE': {
          id: 'MIKE',
          name: 'Mike',
          draft: ['CLE', 'MIN', 'ATL', 'ARI'],
          standings: [],
          draftpicks: [8, 14, 15, 30]
        }
      },
      hidePlayerStandings: false,
      hideTeamStandings: true,
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
    standings: function () {
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
    }
  },
  mounted () {
    this.getStandings()
  }
}

</script>

<style lang="scss">
html {
  background-color: $light;
  color: $dark;
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
