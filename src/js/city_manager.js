export default class CityManager {
    constructor() {
        this.data = null;
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
            throw new Error('data not loaded');
        }
        return this.data.find(e => e['市区町村コード'] == n);
    }
}