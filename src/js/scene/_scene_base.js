export default class Scene {
    constructor(game) {
        this.game = game;
        this.game.app.stage.removeChildren();
        this.tick = 0;
        this.elapsed = 0.0;
    }
    onTick(delta) {
        this.tick++;
        this.elapsed += delta;
    }
    onKeyDown(key) {
    }
    dispose() {
    }
}