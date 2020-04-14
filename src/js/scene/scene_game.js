import * as PIXI from 'pixi.js';
import { Base64 } from 'js-base64';

import Scene from './_scene_base.js';
import SVG from '../svg_util.js';

class CityDisp {
    constructor(city) {
        this.prefText = new PIXI.Text(city['都道府県'], {fill: 0xffffff})
            .setTransform(10, 210);
        this.cityNameText = new PIXI.Text(city['市区町村'], {fill: 0xffffff})
            .setTransform(10, 240);
        this.popText = new PIXI.Text(city['人口'], {fill: 0xffffff})
            .setTransform(10, 270);
        this.imageSprite = SVG.SVG2Sprite(SVG.getSVGCode(SVG.calculateSVGPath(city.path)))
            .setTransform(0, 0);
        this.container = new PIXI.Container();
        this.container.addChild(this.prefText, this.cityNameText, this.popText, this.imageSprite);
    }
}

export default class SceneTest extends Scene {
    constructor(game) {
        super(game);

        this.cities = [];
        this.cityDispList = [];

        this.phase = 0;
    }
    onTick(delta) {
        super.onTick(delta);

        if(this.phase == 0) {
            for(let i = 0; i < 2; i++) {
                var city = this.game.cityManager.getRandomCity();
                this.cities.push(city);
                var citydisp = new CityDisp(city);
                this.cityDispList.push(citydisp.container);
                citydisp.container.setTransform(10+250*i, 50);
                this.game.app.stage.addChild(citydisp.container);
            }
            this.phase = 1;
            console.log(this.cityDispList[0]);
        }
    }
    onKeyDown(key) {
        super.onKeyDown(key);
        if(key == 'KeyA'){
            this.game.changeScene('test');
        }
    }

}
