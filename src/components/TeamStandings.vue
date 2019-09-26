<template>
    <div class="team-standings-table" id="team-standings">
      <div class="team-standings-row header-row">
        <div class="team-standings-cell-rank hide-col">RNK</div>
        <div class="team-standings-cell-rank hide-col">DFT</div>
        <div class="team-standings-cell-rank">VAL</div>
        <div class="team-standings-cell-team">&nbsp;</div>
        <div class="team-standings-cell-result">W</div>
        <div class="team-standings-cell-result">L</div>
        <div class="team-standings-cell-result">T</div>
        <div class="team-standings-cell-player">&nbsp;</div>
      </div>
      <div class="team-standings-row"
        v-for="team in standings"
        :key="team.pickNumber"
        :class="{'highlighted-row': (playerHighlight == team.player.name)}">
        <div class="team-standings-cell-rank hide-col">{{ team.rankNumber }}</div>
        <div class="team-standings-cell-rank hide-col">{{ team.pickNumber }}</div>
        <div class="team-standings-cell-rank"
          :class="[team.valueNumber > 0 ? 'positive-value': '', team.valueNumber < 0 ? 'negative-value' : '']">
          {{ formatValue(team.valueNumber) }}
        </div>
        <div class="team-standings-cell-team nfl-team"><span :id="team.team">{{ team.team }}</span></div>
        <div class="team-standings-cell-result">{{ team.win }}</div>
        <div class="team-standings-cell-result">{{ team.loss }}</div>
        <div class="team-standings-cell-result">{{ team.tie }}</div>
        <div class="team-standings-cell-player">
          <span @click="clickPlayerName(team.player.name)">
            {{ team.player.name }}
          </span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      playerHighlight: ''
    }
  },
  props: {
    standings: {
      type: Array
    }
  },
  methods: {
    clickPlayerName: function (name) {
      if(this.playerHighlight == name) {
        this.playerHighlight = ''
      } else {
        this.playerHighlight = name
      }
    },
    formatValue: function (value) {
      if (value > 0) {
        value = `+${ value }`
      } else if (value === 0) {
        value = 'E'
      }

      return value
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 576px) {
  .hide-col {
    display: none !important;
  }
}

@media screen and (max-width: 465px) {
  #team-standings {
    .team-standings-cell-result {
      flex: 0 0 3.5rem !important;
    }

    .team-standings-cell-team {
      flex: 0 0 8rem !important;
    }
  }
}

#team-standings {
  max-width: 52rem;
  min-width: 34rem;
  margin: 0 auto;
  font-size: 2.2em;
  // background-color: $white;
  border-radius: 1.5rem;
  padding: 1.5rem;

  .team-standings-row {
    display: flex;
    flex: 0 0 52rem;
    flex-direction: row;
    font-weight: bold;
    padding: 1rem 0;
    // color: $medium;

    &:not(:last-child) {
      border-bottom: 0.2rem dotted;
      // border-color: $light;
    }

    &.header-row {
      // color: $dark;
      border-bottom: 0.2rem solid;
      // border-color: $medium;
      padding-bottom: 0.5rem;
    }
  }

  .team-standings-cell-rank {
    flex: 0 0 5.5rem;
  }

  .team-standings-cell-result {
    flex: 0 0 5rem;
  }

  .team-standings-cell-rank {
    text-align: right;
  }

  .team-standings-cell-team {
    flex: 0 0 10rem;
  }

  .team-standings-cell-player {
    flex: 1;
    text-align: left;

    span:hover {
      cursor: pointer;
    }
  }

  .team-standings-cell-currentrank,
  .team-standings-cell-draftnumber {
    text-align: right;
  }

  .team-standings-cellresult {
    justify-content: center;
  }

  .nfl-team > span {
    width: 6rem;
    opacity: 0.75;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    margin: auto;
  }

  .positive-value {
    color: $light-green;
  }

  .negative-value {
    color: $light-red;
  }

  .highlighted-row {
    // color: $dark;
    // background-color: lighten($light, 5%);
    //border-right: 1rem $light solid;

    .positive-value {
      color: $dark-green;
    }

    .negative-value {
      color: $dark-red;
    }
  }
}

@include format-teams($teams-map)

</style>