# Scratchcard-js 
![Build](https://travis-ci.org/Tofandel/ScratchCard.svg?branch=master)
![version](https://img.shields.io/npm/v/@tofandel/scratchcard-js.svg)

ScratchCard is a js lib to simulate a scratchcard in browser with html5 and canvas.

You can see the [**demo page**](https://tofandel.github.io/ScratchCard/).

## Install
You can install ScratchCard with npm:
```
npm install --save @tofandel/scratchcard-js
```
or just clone this repo:
```
git clone https://github.com/Masth0/ScratchCard.git
```
and pick in the folder **./build** the file **scratchard.min.js**

## Getting started

```js
import {ScratchCard, SCRATCH_TYPE} from '@tofandel/scratchcard-js'

const scContainer = document.getElementById('js--sc--container')
// You also can pass a querySelector string
const sc = new ScratchCard(scContainer, {
  scratchType: SCRATCH_TYPE.SPRAY,
  containerWidth: scContainer.offsetWidth,
  containerHeight: 300,
  imageForwardSrc: '/images/scratchcard.jpg',
  imageBackgroundSrc: '/images/result.png',
  htmlBackground: '<p class="test"><strong>Hello i am HTML content !</strong></p>',
  clearZoneRadius: 50,
  nPoints: 30,
  pointSize: 4,
  callback: function () {
    alert('Now the window will reload !')
    window.location.reload()
  }
})

// Init
sc.init().then(() => {
  sc.canvas.addEventListener('scratch.move', () => {
    let percent = sc.getPercent().toFixed(2)
    console.log(percent)
  })
}).catch((error) => {
  // image not loaded
  alert(error.message);
});
```

## Events
**'scratch.move'**
```js
sc.canvas.addEventListener('scratch.move', function() {
  let percent = sc.getPercent();
  console.log(percent);
});
```
