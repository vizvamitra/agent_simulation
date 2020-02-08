import paper from "paper"
import Simulation from './model/Simulation'
import './tailwind.css';

window.Config = {
  visualization: {
    stepsPerFrame: 5000,
    displayAgents: false,
    locationScale: 6
  },
  simulation: {
    agentCount: 10,
    world: {
      width: 100,
      height: 100,
      maxFoodPerLocation: 10
    },
    agent: {
      hungerPerStep: 0.05,
      numberOfSensors: 3,
      radius: 0.5,
      speedCoefficient: 1,
      sensorNoise: {
        direction: 0.05,
        foodAmount: { min: 0.1, max: 0.2 }
      }
    }
  }
}

var simulation = new Simulation(Config.simulation)

var form = document.querySelector('form')
form.addEventListener('input', function(e) {
  var nesting = `["${e.target.name.split('_').join('"]["')}"]`
  var value = e.target.type == 'checkbox' ? e.target.checked : e.target.value

  eval(`Config${nesting} = ${value}`)

  simulation = new Simulation(Config.simulation)
})

var restartButton = document.querySelector('#restartBtn')
restartButton.addEventListener('click', function(e){
  e.preventDefault()
  e.stopPropagation()

  simulation = new Simulation(Config.simulation)
})
// window.addEventListener('load', function() {
//   navigator.serviceWorker.register('/js/sw.js').then(
//     reg => console.log(reg),
//     err => console.log(err)
//   );
// })
