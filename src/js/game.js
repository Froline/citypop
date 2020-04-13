import * as PIXI from 'pixi.js'
import CityManager from './city_manager.js'

import SceneTest from './scene/scene_test.js';

export default class Game {
    constructor() {
        this.app = new PIXI.Application();
        this.loader = new PIXI.Loader();
        document.body.appendChild(this.app.view);

        this.scene = null;

        this.cityManager = new CityManager();
        var loaded = this.cityManager.load('./data/cities.dat');
        loaded.then(() => {
            this.scene = new SceneTest(this);
            this.app.ticker.add(delta => this.onTick(delta));
        });
    
    }
    onTick(delta) {
        this.scene && this.scene.onTick(this, delta);
    }
}