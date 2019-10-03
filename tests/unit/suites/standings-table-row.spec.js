import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StandingsTableRow from '@/components/StandingsTableRow'
import { type } from 'os'

export default function suite() {
  const wrapperFactory = (settings = {}) => {
    return shallowMount(StandingsTableRow, {
      propsData: {
        tableHeader: settings.header  || false,
        nflTeamRow:  settings.team    || false,
        playerRow:   settings.player  || false,
        results:     settings.results || {}
      }
    })
  }

  it('renders the correct name', () => {
    const results = { name: "Test" }
    const wrapper = wrapperFactory({ player: true, results: results })

    expect(wrapper.find('.team-results-row .team-results-row-name').text()).to.equal("Test");
  })

  describe('DOM structure', () => {
    it('display a header row', () => {
      const wrapper = wrapperFactory({ header: true })
  
      expect(wrapper.findAll('.team-results-row.header-row').length).to.equal(1)
    })
  
    it('display a player row', () => {
      const wrapper = wrapperFactory({ player: true })
  
      expect(wrapper.findAll('.team-results-row.player-header').length).to.equal(1)
    })
  
    it('display a team row', () => {
      const wrapper = wrapperFactory({ team: true })
  
      expect(wrapper.findAll('.team-results-row.nfl-team-row').length).to.equal(1)
    })
  })
}