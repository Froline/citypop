import * as PIXI from 'pixi.js';
import { Base64 } from 'js-base64';

import Scene from './_scene_base.js';
import SVG from '../svg_util.js';

export default class SceneTest extends Scene {
    constructor(game) {
        super(game);

        this.city = this.game.cityManager.getRandomCity();
        this.citySVG = SVG.getSVGCode(SVG.calculateSVGPath(this.city.path));

        let url = 'data:image/svg+xml;base64,' + Base64.encode(this.citySVG);
        this.svg_resource = new PIXI.resources.SVGResource(url);
        this.base_texture = new PIXI.BaseTexture(this.svg_resource);
        this.texture = new PIXI.Texture(this.base_texture);

        this.bunny = new PIXI.Sprite(this.texture);

        // Setup the position of the this.bunny
        this.bunny.x = this.game.app.renderer.width / 2;
        this.bunny.y = this.game.app.renderer.height / 2;

        // Rotate around the center
        this.bunny.anchor.x = 0.5;
        this.bunny.anchor.y = 0.5;

        // Add the this.bunny to the scene we are building.
        this.game.app.stage.addChild(this.bunny);

        this.prefText = new PIXI.Text(this.city.都道府県, { fill: 0xffffff });
        this.prefText.x = 50;
        this.prefText.y = 100;
        this.prefText.alpha = 0;
        this.game.app.stage.addChild(this.prefText);

        this.cityText = new PIXI.Text(this.city.市区町村, { fill: 0xffffff });
        this.cityText.x = 50;
        this.cityText.y = 140;
        this.cityText.alpha = 0;
        this.game.app.stage.addChild(this.cityText);

        this.popuText = new PIXI.Text(`人口 : ${this.city.人口} 人`, { fill: 0xffffff });
        this.popuText.x = 50;
        this.popuText.y = 180;
        this.popuText.alpha = 0;
        this.game.app.stage.addChild(this.popuText);

        this.areaText = new PIXI.Text(`面積 : ${this.city.面積} km^2`, { fill: 0xffffff });
        this.areaText.x = 50;
        this.areaText.y = 220;
        this.areaText.alpha = 0;
        this.game.app.stage.addChild(this.areaText);
    }
    onTick(delta) {
        super.onTick(delta);
        console.log(this.tick);

        // each frame we spin the this.bunny around a bit
        this.bunny.rotation += 0.01;
        if (this.tick > 180 && this.tick < 180 + 100) {
            this.prefText.alpha = (this.tick - 180) * 0.01;
        }
        if (this.tick > 300 && this.tick < 300 + 100) {
            this.popuText.alpha = (this.tick - 300) * 0.01;
        }
        if (this.tick > 320 && this.tick < 320 + 100) {
            this.areaText.alpha = (this.tick - 320) * 0.01;
        }
        if (this.tick > 460 && this.tick < 460 + 100) {
            this.cityText.alpha = (this.tick - 460) * 0.01;
        }
    }
    onKeyDown(key) {
        super.onKeyDown(key);
        if(key == 'KeyA'){
            this.game.changeScene('test');
        }
    }

}
