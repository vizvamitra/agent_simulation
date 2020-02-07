window.rects = []
var state = simulation.getState()
for (var i = 0; i < state.foodField.length; i++) {
  rects.push([])
  for (var j = 0; j < state.foodField[i].length; j++) {
    rects[i].push(
      new Path.Rectangle({
        point: [i*8 + 1, j*8 + 1],
        size: [8, 8],
        fillColor: `#${Math.round(state.foodField[i][j] * 25.5).toString(16)}0000`
      })
    )
  }
}

export function onFrame(event) {
  for (var k = 0; k < 5000; k++) { simulation.step() }

  var state = simulation.getState()

  for (var i = 0; i < state.foodField.length; i++) {
    for (var j = 0; j < state.foodField[i].length; j++) {
      rects[i][j].fillColor = `#${Math.round(state.foodField[i][j] * 25.5).toString(16)}0000`
    }
  }

  // state.agents.forEach(function (agent) {
  //   var rect = rects[Math.round(agent.location.x)][Math.round(agent.location.y)]
  //   rect.fillColor = agent.state == 'alive' ? '#00FF00' : '#0000FF'
  // })
}
