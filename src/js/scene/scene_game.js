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

        this.cityConvayerContainer = new PIXI.Container();
        this.game.app.stage.addChild(this.cityConvayerContainer);

        this.messageText = new PIXI.Text('', {fill: 0xccffff});
        this.messageText.x = 100;
        this.messageText.y = 450;
        this.game.app.stage.addChild(this.messageText);

        this.scoreText = new PIXI.Text('Score: 0', {fill: 0xff8888});
        this.scoreText.x = 100;
        this.scoreText.y = 480;
        this.game.app.stage.addChild(this.scoreText);

        this.phase = 0;
        this.qn = 0;  // question number
    }
    onTick(delta) {
        super.onTick(delta);

        if(this.phase == 0) {
            for(let i = 0; i < 2; i++) {
                var city = this.game.cityManager.getRandomCity();
                this.cities.push(city);
                var citydisp = new CityDisp(city);
                this.cityDispList.push(citydisp);
                citydisp.container.setTransform(10+250*i, 50);
                this.cityConvayerContainer.addChild(citydisp.container);
                if(i == 1) citydisp.popText.alpha = 0;

                this.qn = 1;
            }
            this.phase = 1;
        } else if(this.phase == 1) {
            if(this.keys.includes('ShiftLeft') || this.keys.includes('ShiftRight')) {
                console.log(this.cityDispList[this.qn]);
                this.cityDispList[this.qn].popText.alpha = 1;
                let left = this.keys.includes('ShiftLeft');
                let right = this.keys.includes('ShiftRight');
                let hl = this.cities[this.qn]['人口'] > this.cities[this.qn - 1]['人口'] ? 'right' : 'left';
                if( (hl == 'right' && right) || (hl == 'left' && left) ) {
                    this.messageText.text = 'GREAT!';
                    this.scoreText.text = 'Score: ' + this.qn;
                    this.phase = 2;
                    this.p2time = this.tick;
                } else {
                    this.messageText.text = 'GAME OVER';
                }
            }
        } else if(this.phase == 2) {
            if(this.tick - this.p2time >= 60) {
                this.phase = 3;
                this.messageText.text = '';
            }
        } else if(this.phase == 3) {
            this.qn++;
            var city = this.game.cityManager.getRandomCity();
            this.cities.push(city);
            var citydisp = new CityDisp(city);
            this.cityDispList.push(citydisp);
            citydisp.container.setTransform(10+250*this.qn, 50);
            this.cityConvayerContainer.addChild(citydisp.container);
            citydisp.popText.alpha = 0;
            this.phase = 4;
            this.p4time = this.tick;
        } else if(this.phase == 4) {
            this.cityConvayerContainer.x -= 250 / 30;
            if(this.tick - this.p4time >= 30) {
                this.phase = 1;
            }
        }
    }
    onKeyDown(key) {
        super.onKeyDown(key);
        if(key == 'KeyA'){
            this.game.changeScene('game');
        }
    }

}
