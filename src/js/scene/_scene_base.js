export default class Scene {
    constructor(game) {
        this.game = game;
        this.game.app.stage.removeChildren();
        this.tick = 0;
        this.elapsed = 0.0;

        this.keys = [];
        this.__nextFrameKey = [];
    }
    onTick(delta) {
        this.keys = [];
        for(let i = this.__nextFrameKey.length; i > 0; i--) {
            this.keys.push(this.__nextFrameKey.pop());
        }
        this.tick++;
        this.elapsed += delta;
    }
    onKeyDown(key) {
        this.__nextFrameKey.push(key);
    }
    dispose() {
    }
}