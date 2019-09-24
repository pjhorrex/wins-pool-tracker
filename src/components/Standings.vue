<template>
  <div id='standings'>
    <div class="team-results-table" v-for="standing in standings" :key="standing.id">
      <div class="team-results-header">
        <div class="team-results-row header-row">
          <div class="team-results-row-name" v-if="calcGamesBack(standing) != 0">GB:&nbsp;{{ calcGamesBack(standing) }}</div>
          <div class="team-results-row-name" v-else>LEADER</div>
          <div class="team-results-row-result">W</div>
          <div class="team-results-row-result">L</div>
          <div class="team-results-row-result">T</div>
        </div>
      </div>
      <div class="team-results-body">
        <div class="team-results-row">
          <div class="team-results-row-name">{{ standing.name }}</div>
          <div class="team-results-row-result">{{ standing.win }}</div>
          <div class="team-results-row-result">{{ standing.loss }}</div>
          <div class="team-results-row-result">{{ standing.tie }}</div>
        </div>
        <div class="team-results-row nfl-team-row" v-for="team in standing.standings" :key="team.team">
          <div class="team-results-row-name nfl-team"><span :id="team.team">{{ team.team }}</span></div>
          <div class="team-results-row-result">{{ team.win }}</div>
          <div class="team-results-row-result">{{ team.loss }}</div>
          <div class="team-results-row-result">{{ team.tie }}</div>
        </div>
      </div>
      <div class="team-draft-picks">
        <span class="team-draft-picks-desc">PICKS:&nbsp;</span>
        <span class="team-draft-picks-pick" v-for="pick in standing.draftpicks" :key="pick">{{ pick }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    standings: {
      type: Array
    }
  },
  methods: {
    calcGamesBack: function (currPlayer) {
      const firstPlayer = this.standings[0]
      const winDiff = firstPlayer.win - currPlayer.win
      const lossDiff = firstPlayer.loss - currPlayer.loss

      const wholePart = Math.floor((winDiff - lossDiff) / 2)
      const decimalPart = ((winDiff - lossDiff) % 2) === 1 ? '½' : ''
      console.log((winDiff - lossDiff) % 2)

      return wholePart + decimalPart
    }
  }
}

</script>

<style lang="scss" scoped>
  #standings {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-width: 750px;
    margin: 0 auto;
  }

  @media screen and (min-width: 1500px) {
    #standings {
      max-width: 1500px;
    }
  }

  .team-results-table {
    margin: 10px;
    padding: 15px;
    background-color: #eee;
    border-radius: 15px;
    flex: 0 1 320px;
  }

  .team-results-header,
  .team-results-body {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
  }

  .team-results-row {
    display: flex;
    flex-direction: row;
    font-size: 22px;
    font-weight: bold;
    width: 100%;
    padding: 5px 0;
    border-radius: 8px;
  }

  .team-results-row:not(.nfl-team-row):not(.header-row) {
    background-color: #5a6673;
    color: #f2f2f2;
  }

  .nfl-team-row:not(:last-child) {
    border-bottom: 2px #cacaca dotted;
  }

  .team-results-row-name,
  .team-results-row-result {
    padding: 5px 0;
    display: flex;
  }

  .team-results-row-name {
    padding-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
  }

  .team-results-row-name {
    flex: 1 1 150px;
    justify-content: left;
  }

  .team-results-row-result {
    flex: 0 0 50px;
    justify-content: center;
  }

  .nfl-team-row {
    color: #9d9d9d;
  }

  .nfl-team > span {
    width: 60px;
    opacity: 0.75;
    border-radius: 5px;
  }

  .team-draft-picks {
    padding-top: 5px;
    color: #9d9d9d;
  }

  .team-draft-picks-pick:not(:last-child)::after {
    content: ",\00a0";
  }

  .nfl-team > span#PHI {
    background-color: #004C54;
    color: #A5ACAF;
  }

  .nfl-team > span#NE {
    background-color: #C60C30;
    color: #002244;
  }

  .nfl-team > span#ARI {
    background-color: #97233F;
    color: #FFB612;
  }

  .nfl-team > span#BUF {
    background-color: #00338D;
    color: #C60C30;
  }

  .nfl-team > span#CIN {
    background-color: #FB4F14;
    color: #000000;
  }

  .nfl-team > span#DEN {
    background-color: #FB4F14;
    color: #002244;
  }

  .nfl-team > span#HOU {
    background-color: #03202F;
    color: #A71930;
  }

  .nfl-team > span#KC {
    background-color: #E31837;
    color: #FFFFFF;
  }

  .nfl-team > span#MIN {
    background-color: #4F2683;
    color: #FFC62F;
  }

  .nfl-team > span#NYG {
    background-color: #0B2265;
    color: #A71930;
  }

  .nfl-team > span#SF {
    background-color: #B3995D;
    color: #AA0000;
  }

  .nfl-team > span#TEN {
    background-color: #418FDE;
    color: #0C2340;
  }

  .nfl-team > span#ATL {
    background-color: #A71930;
    color: #000000;
  }

  .nfl-team > span#CAR {
    background-color: #0085CA;
    color: #101820;
  }

  .nfl-team > span#CLE {
    background-color: #311D00;
    color: #FF3C00;
  }

  .nfl-team > span#DET {
    background-color: #0076B6;
    color: #B0B7BC;
  }

  .nfl-team > span#IND {
    background-color: #002C5F;
    color: #FFFFFF;
  }

  .nfl-team > span#LAR {
    background-color: #002244;
    color: #B3995D;
  }

  .nfl-team > span#NYJ {
    background-color: #125740;
    color: #FFFFFF;
  }

  .nfl-team > span#PIT {
    background-color: #101820;
    color: #FFB612;
  }

  .nfl-team > span#SEA {
    background-color: #002244;
    color: #69BE28;
  }

  .nfl-team > span#WAS {
    background-color: #773141;
    color: #FFB612;
  }

  .nfl-team > span#BAL {
    background-color: #241773;
    color: #9E7C0C;
  }

  .nfl-team > span#CHI {
    background-color: #0B162A;
    color: #C83803;
  }

  .nfl-team > span#DAL {
    background-color: #869397;
    color: #041E42;
  }

  .nfl-team > span#GB {
    background-color: #203731;
    color: #FFB612;
  }

  .nfl-team > span#JAX {
    background-color: #006778;
    color: #D7A22A;
  }

  .nfl-team > span#MIA {
    background-color: #008E97;
    color: #FC4C02;
  }

  .nfl-team > span#NO {
    background-color: #D3BC8D;
    color: #101820;
  }

  .nfl-team > span#OAK {
    background-color: #C4C9CC;
    color: #000000;
  }

  .nfl-team > span#LAC {
    background-color: #0080C6;
    color: #FFC20E;
  }

  .nfl-team > span#TB {
    background-color: #D50A0A;
    color: #FF7900;
  }

</style>
