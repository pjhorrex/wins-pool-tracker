import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StandingsTable from '@/components/StandingsTable'

export default function suite() {
  const wrapperFactory = (standingsTable = {}, leader = {}) => {
    return shallowMount(StandingsTable, {
      propsData: {
        leader: leader,
        standingsTable: standingsTable
      }
    })
  }

  it('calculates LEADER from an equal record', () => {
    const expected = 'LEADER'
    const wrapper = wrapperFactory(
      {"win":2,"loss":0,"tie":0},
      {"win":2,"loss":0,"tie":0}
    )

    expect(wrapper.vm.gamesBack).to.equal(expected)
  })

  it('calculates ½ games back without a leading zero', () => {
    const expected = '½'
    const wrapper = wrapperFactory(
      {"win":1,"loss":0,"tie":1},
      {"win":2,"loss":0,"tie":0}
    )

    expect(wrapper.vm.gamesBack).to.equal(expected)
  })

  it('calculates 1½ games back from a tie', () => {
    const expected = '1½'
    const wrapper = wrapperFactory(
      {"win":0,"loss":1,"tie":1},
      {"win":2,"loss":0,"tie":0}
    )

    expect(wrapper.vm.gamesBack).to.equal(expected)
  })
  
  it('calculates 1½ games back from an extra game', () => {
    const expected = '1½'
    const wrapper = wrapperFactory(
      {"win":1,"loss":2,"tie":0},
      {"win":2,"loss":0,"tie":0}
    )

    expect(wrapper.vm.gamesBack).to.equal(expected)
  })

  describe('DOM structure', () => {
    it('should have a single table header', () => {
      const wrapper = wrapperFactory()

      expect(wrapper.findAll('.team-results-header').length).to.equal(1)
    })

    it('should have a single table body', () => {
      const wrapper = wrapperFactory()

      expect(wrapper.findAll('.team-results-body').length).to.equal(1)
    })

    it('should have a div to display draft picks', () => {
      const wrapper = wrapperFactory()

      expect(wrapper.findAll('.team-draft-picks').length).to.equal(1)
    })

    describe('Table body structure', () => {
      it('should have a player header', () => {
        const wrapper = wrapperFactory()

        expect(wrapper.findAll('.team-results-row.player-header').length).to.equal(1)
      })

      it('should have 4 team rows', () => {
        const wrapper = wrapperFactory({ standings: [{},{},{},{}] })

        expect(wrapper.findAll('.team-results-row.nfl-team-row').length).to.equal(4)
      })
    })

    describe('Draft picks structure', () => {
      it('should have 4 team rows', () => {
        const wrapper = wrapperFactory({ draftpicks: [1,2,3,4] })

        expect(wrapper.findAll('.team-draft-picks-pick').length).to.equal(4)
      })

      it('should display the correct pick numbers', () => {
        const wrapper = wrapperFactory({ draftpicks: [1,2,3,4] })

        expect(wrapper.find('.team-draft-picks').text()).to.match(/PICKS:\s1234/)
      })
    })
  })
}