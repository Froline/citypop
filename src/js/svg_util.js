import * as PIXI from 'pixi.js';
import { Base64 } from 'js-base64';

export default class SVG {
    // SVG path -> complete SVG code
    static getSVGCode(str, fill_color='red', width=200, height=200) {
        return this._template.replace(/\{width\}/g, width)
            .replace(/\{height\}/g, height)
            .replace(/\{path\}/g, str)
            .replace(/\{fill_color\}/g, fill_color);
    }
    // SVG code -> PIXI.Sprite
    static SVG2Sprite(str) {
        let url = 'data:image/svg+xml;base64,' + Base64.encode(str);
        let svg_resource = new PIXI.resources.SVGResource(url);
        let base_texture = new PIXI.BaseTexture(svg_resource);
        let texture = new PIXI.Texture(base_texture);
        return new PIXI.Sprite(texture);
    }

    static calculateSVGPath(multiPoly) {
        let tokens = [];
        for (const poly of multiPoly) {
            for (const cycle of poly) {
                let subtokens = [];  
                for (const [x,y] of cycle) {
                    subtokens.push(x+','+y);
                }
                tokens.push('M '+subtokens.join(' L ')+' z');
            }
        }
        return tokens.join(' ');
    }
}
SVG._template =
`<svg width="{width}" height="{height}" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
<path d="{path}" fill="{fill_color}"/>
</svg>`;

