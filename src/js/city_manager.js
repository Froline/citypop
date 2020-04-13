
import msgpack from 'msgpack-lite';

export default class CityManager {
    constructor() {
        this.data = null;
    }

    async load(src) {
        let d = await fetch(src);
        if(!d.ok) {
            throw new Error(`cannot load ${src}`);
        }
        let data = new Uint8Array(await d.arrayBuffer());
        this.data = msgpack.decode(data);
        return;
    }

    getCityFromCode(n) {
        if(!this.data) {
            throw new Error('data not loaded');
        }
        return this.data.find(e => e['市区町村コード'] == n);
    }

    getRandomCity() {
        if(!this.data) {
            throw new Error('data not loaded');
        }
        let r = Math.floor(this.data.length * Math.random());
        return this.data[r]; 
    }

    
}