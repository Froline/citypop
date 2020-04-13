import * as PIXI from 'pixi.js';
import CityManager from './city_manager.js';

import {SceneTest,SceneTitle} from './scene/';

export default class Game {
    constructor() {
        this.app = new PIXI.Application();
        this.loader = new PIXI.Loader();
        document.body.appendChild(this.app.view);

        this._sceneList = {
            test: SceneTest,
            title: SceneTitle,
        };

        this.loader.add([
            { name: 'bunny', url: './img/bunny.png' },
            { name: 'logo', url: './img/latenaughts_logo.png' },
        ]);

        this.scene = null;

        this.cityManager = new CityManager();
        var citymanager_loaded = this.cityManager.load('./data/cities.dat');
        var pixi_loaded = new Promise( (resolve, reject) => {
            this.loader.load( (loader, resources) => {
                resolve();
            } );
        });

        Promise.all([citymanager_loaded, pixi_loaded]).then(() => {
            this.scene = new SceneTitle(this);
            this.app.ticker.add(delta => this.onTick(delta));
        });
    
    }

    changeScene(scene) {
        this.scene.dispose();
        this.scene = new this._sceneList[scene](this);
    }

    onTick(delta) {
        this.scene && this.scene.onTick(delta);
    }
    onKeyDown(key) {
        this.scene && this.scene.onKeyDown(key);
    }
}