export default {
  sortStandings: function (teamA, teamB) {
    if (teamA.win < teamB.win) {
      return 1
    } else if (teamA.win > teamB.win) {
      return -1
    } else {
      if (teamA.loss > teamB.loss) {
        return 1
      } else if (teamA.loss < teamB.loss) {
        return -1
      }
    }

    return 0
  }
}
