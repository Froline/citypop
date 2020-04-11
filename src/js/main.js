import * as PIXI from 'pixi.js'
import CityManager from './city_manager.js'
import SVG from './svg_util.js'

//const CityManager = require('./city_manager.js');
//const SVG = require('./svg_util.js');

// 五所川原 2205

document.addEventListener('DOMContentLoaded', () => {
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
console.log(PIXI); 

const app = new PIXI.Application();
const loader = new PIXI.Loader();
 
// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

const cityManager = new CityManager();
var loaded = cityManager.load('./data/data.json');
const goshogawara = SVG.getSVG(cityManager.getCityFromCode(2205).svg);

// load the texture we need
loaded.then( loader.add('bunny', goshogawara).load((loader, resources) => {
 
    // This creates a texture from a 'bunny.png' image.
    const bunny = new PIXI.Sprite(resources.bunny.texture);
 
    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;
 
    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;
 
    // Add the bunny to the scene we are building.
    app.stage.addChild(bunny);
 
    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });
}) );

});