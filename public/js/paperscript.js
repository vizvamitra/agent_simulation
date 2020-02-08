var rects = [];
var config = Config.visualization;

var state = simulation.getState();
for (var i = 0; i < state.foodField.length; i++) {
  rects.push([]);
  for (var j = 0; j < state.foodField[i].length; j++) {
    rects[i].push(
      new Path.Rectangle({
        point: [i * config.locationScale + 1, j * config.locationScale + 1],
        size: [config.locationScale, config.locationScale],
        fillColor: `#${Math.round(state.foodField[i][j] * 25.5).toString(16)}0000`
      })
    );
  }
}

function onFrame(event) {
  for (var k = 0; k < config.stepsPerFrame; k++) { simulation.step(); }

  var state = simulation.getState();

  for (var i = 0; i < state.foodField.length; i++) {
    for (var j = 0; j < state.foodField[i].length; j++) {
      rects[i][j].fillColor = `#${Math.round(state.foodField[i][j] * 25.5).toString(16)}0000`;
    }
  }

  if (config.displayAgents) {
    state.agents.forEach(function (agent) {
      var rect = rects[Math.round(agent.location.x)][Math.round(agent.location.y)];
      rect.fillColor = agent.state == 'alive' ? '#00FF00' : '#0000FF';
    });
  }
}

export { onFrame };
//# sourceMappingURL=paperscript.js.map
