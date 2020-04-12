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

    const app = new PIXI.Application();
    const loader = new PIXI.Loader();

    // The application will create a canvas element for you that you
    // can then insert into the DOM.
    document.body.appendChild(app.view);

    const cityManager = new CityManager();
    var loaded = cityManager.load('./data/cities.dat');

    function reset() {
        app.stage.removeChildren();

        const city = cityManager.sampleCity()
        const citySVG = SVG.getSVGCode(SVG.calculateSVGPath(city.path));

        let url = 'data:image/svg+xml;base64,' + Base64.encode(citySVG);
        const svg_resource = new PIXI.resources.SVGResource(url);
        const base_texture = new PIXI.BaseTexture(svg_resource);
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

        const prefText = new PIXI.Text(city.都道府県, { fill: 0xffffff });
        prefText.x = 50;
        prefText.y = 100;
        prefText.alpha = 0;
        app.stage.addChild(prefText);

        const cityText = new PIXI.Text(city.市区町村, { fill: 0xffffff });
        cityText.x = 50;
        cityText.y = 140;
        cityText.alpha = 0;
        app.stage.addChild(cityText);

        const popuText = new PIXI.Text(`人口 : ${city.人口} 人`, { fill: 0xffffff });
        popuText.x = 50;
        popuText.y = 180;
        popuText.alpha = 0;
        app.stage.addChild(popuText);

        const areaText = new PIXI.Text(`面積 : ${city.面積} km^2`, { fill: 0xffffff });
        areaText.x = 50;
        areaText.y = 220;
        areaText.alpha = 0;
        app.stage.addChild(areaText);

        let t = 0;
        // Listen for frame updates
        app.ticker.add((d) => {
            // each frame we spin the bunny around a bit
            bunny.rotation += 0.01;
            t++;
            if (t > 180 && t < 180 + 100) {
                prefText.alpha = (t - 180) * 0.01
            }
            if (t > 300 && t < 300 + 100) {
                popuText.alpha = (t - 300) * 0.01
            }
            if (t > 320 && t < 320 + 100) {
                areaText.alpha = (t - 320) * 0.01
            }
            if (t > 460 && t < 460 + 100) {
                cityText.alpha = (t - 460) * 0.01
            }

        });
        canvas.addEventListener('click', reset)
    }

    loaded.then(reset);

});