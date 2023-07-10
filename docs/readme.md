# Scratchcard-js

ScratchCard is a js lib to simulate a scratchcard in browser with html5 and canvas.

## Install
You can install ScratchCard with npm:
```
npm install --save @tofandel/scratchcard-js
```

## Import ScratchCard

```js
import ScratchCard from '@tofandel/scratchcard-js';
```

## Configuration
See the types in action: [Line](/brushes/line), [Spray](/brushes/spray), [Circle](/brushes/circle), [Brush](/brushes/brush)
| Name  | Type | Default value | Comment |
|---|---|---|---|
| **scratchType** | SCRATCH_TYPE | LINE | Possibles values : LINE, SPRAY, CIRCLE, BRUSH |
| **percentToFinish** | number | 50 | The percentage at which the scratchcard will consider itself fully uncovered |
| **containerWidth** | number | 100 |  |
| **containerHeight** | number | 100 |  |
| **brushSrc** | string | "" | For type.BRUSH |
| **imageForwardSrc** | string | "" |  |
| **imageBackgroundSrc** | string | "" |  |
| **htmlBackground** | string | "" | <br> ``` `<p>Html-content<p>` ``` |
| **callback** | function | function() { alert('done.'); } |  |
| **clearZoneRadius** | number | 0 | For type.CIRCLE and type.LINE |
| **nPoints** | number | 30 | For type.SPRAY |
| **pointSize** | number | 4 | For type.SPRAY |

## Initialization method
```js
sc.init().then(() => {
  // Do what you want
  // ex: listen scratch.move event
}).catch((error) => {
  // image not loaded
});
```

## Event:  scratch.move
```js
sc.canvas.addEventListener('scratch.move', () => {
  let percent = sc.getPercent();
  // ...
});
```
