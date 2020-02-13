import { Simulation } from './Simulation'
import { Visualization } from './Visualization'

export class UI {
  constructor(config) {
    this.config = config
  }

  init() {
    var form = document.querySelector('form')
    form.addEventListener('input', this._onConfigChange.bind(this))

    var restartButton = document.querySelector('#restartBtn')
    restartButton.addEventListener('click', this._onRestartClick.bind(this))
  }

  _onConfigChange(e) {
    var nesting = `["${e.target.name.split('_').join('"]["')}"]`
    var value = Number(e.target.value)

    eval(`this.config${nesting} = ${value}`)

    var simulation = new Simulation(this.config.simulation)
    window.visualization = new Visualization(simulation, this.config.visualization)
    visualization.init()
  }

  _onRestartClick(e) {
    e.preventDefault()
    e.stopPropagation()

    var simulation = new Simulation(this.config.simulation)
    window.visualization = new Visualization(simulation, this.config.visualization)
    visualization.init()
  }
}
