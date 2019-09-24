<template>
  <div id='app'>
    <h1 class="title">{{ title }}</h1>
    <Standings :standings="standings"/>
  </div>
</template>

<script>
import Standings from './components/Standings'
import axios from 'axios'
import mixins from './mixins'

export default {
  name: 'NFLWinsPool',
  components: {
    Standings
  },
  mixins: [mixins],
  data: function () {
    return {
      apiLocation: 'https://api.sportsdata.io/v3/nfl/scores/json/Standings/2019?key=1a629c3b0ab44359b19f90d489a89750',
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
      }
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

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:900&display=swap');

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5a6673;
  margin-top: 20px;
}

.title {
  text-transform: uppercase;
}

</style>
