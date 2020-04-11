import * as PIXI from 'pixi.js'
import { Base64 } from 'js-base64';

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

loaded.then( () => { 
    const goshogawara = SVG.getSVGCode(cityManager.getCityFromCode(2205).svg);

    let url = 'data:image/svg+xml;base64,' + Base64.encode(goshogawara);
    document.getElementById('svg_test').src = url;
    const svg_resource = new PIXI.resources.SVGResource(url);
    const base_texture = new PIXI.BaseTexture(svg_resource);
    console.log(base_texture);
    const texture = new PIXI.Texture(base_texture);

    const bunny = new PIXI.Sprite(texture);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building.
    app.stage.addChild(bunny);

    const basicText = new PIXI.Text('Basic text in pixi', { fill: 0xffffff });
    basicText.x = 50;
    basicText.y = 100;
    app.stage.addChild(basicText);


    // Listen for frame updates
    app.ticker.add(() => {
        // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });

} );

});