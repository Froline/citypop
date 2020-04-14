import * as PIXI from 'pixi.js';
import Scene from './_scene_base.js';

export default class SceneTitle extends Scene {
    constructor(game) {
        super(game);
        this.logo = game.app.stage.addChild(new PIXI.Sprite(game.loader.resources['logo'].texture));
        this.logo.setTransform(100, 100);
    }
    onTick(delta) {
        super.onTick(delta);
    }
    onKeyDown(key) {
        super.onKeyDown(key);
        if(key == 'KeyA'){
            this.game.changeScene('game');
        }
    }
}