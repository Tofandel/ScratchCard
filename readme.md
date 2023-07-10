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

## Getting started

```js
import ScratchCard from '@tofandel/scratchcard-js'

const scContainer = document.getElementById('js--sc--container')
// You also can pass a querySelector string
const sc = new ScratchCard(scContainer, {
    scratchType: ScratchCard.type.SPRAY,
    containerWidth: scContainer.offsetWidth,
    containerHeight: 300,
    percentToFinish: 50,
    imageForwardSrc: '/images/scratchcard.jpg',
    imageBackgroundSrc: '/images/result.png',
    htmlBackground: '<p class="test"><strong>Hello i am HTML content !</strong></p>',
    clearZoneRadius: 50,
    nPoints: 30,
    pointSize: 4,
    callback: function () {
        alert("The scratchcard will reset in 1 second");
        setTimeout(() => this.init(), 1000);
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

// After 5seconds, the scratchcard will finish
setTimeout(() => sc.finish(), 5000);
```

## Events

**'scratch.move'**

```js
sc.canvas.addEventListener('scratch.move', function () {
    let percent = sc.getPercent();
    console.log(percent);
});
```**
