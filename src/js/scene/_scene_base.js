export default class Scene {
    constructor(game) {
        game.app.stage.removeChildren();
        this.tick = 0;
        this.elapsed = 0.0;
    }
    onTick(game, delta) {
        this.tick++;
        this.elapsed += delta;
    }
}