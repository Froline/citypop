import * as PIXI from 'pixi.js'
import Scene from './_scene_base.js';

export default class SceneTitle extends Scene {
    constructor(game) {
        super(game);
        this.logo = game.app.stage.addChild(new PIXI.Sprite(game.loader.resources['logo'].texture));
        this.logo.setTransform(100, 100);
    }
    onTick(game, delta) {
        super.onTick(game, delta);
    }
}