const PIXI = require('pixi.js');

class CityManager {
    constructor() {
        this.data = null;
    }

    static NotLoadedError() {
        return { message: 'city data not loaded', name: 'NotLoadedError' };
    }

    async load(src) {
        let d = await fetch(src);
        if(!d.ok) {
            throw new Error(`cannot load ${src}`);
        }
        this.data = d.json();
        return;
    }

    getCityFromCode(n) {
        if(!this.data) {
            throw new NotLoadedError();
        }
        return this.data.find(e => e['市区町村コード'] == n);
    }
}