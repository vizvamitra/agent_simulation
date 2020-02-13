
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var rects = [];

var cells = test.cells;

for (var i = 0; i < cells.length; i++) {
  rects.push([]);
  for (var j = 0; j < cells[i].length; j++) {
    rects[i].push(
      new Path.Rectangle({
        point: [i * 12 + 1, j * 12 + 1],
        size: [12, 12],
        fillColor: cells[i][j].isActive() ? 'red' : 'black'
      })
    );
  }
}

var timeInterval = 0.001;
var stepsPerFrame = 1;
var direction = new Vector2(1, 0);
var speed = 44;

function onFrame(event) {
  for (var k = 0; k < stepsPerFrame; k++) { test.step(direction, speed, timeInterval); }

  var cells = test.cells;

  for (var i = 0; i < cells.length; i++) {
    for (var j = 0; j < cells[i].length; j++) {
      rects[i][j].fillColor = cells[i][j].isActive() ? 'red' : 'black';
    }
  }
}

export { onFrame };
//# sourceMappingURL=paperscript2.js.map
