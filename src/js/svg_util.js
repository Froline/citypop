export default class SVG {
    static getSVGCode(str, fill_color='red', width=200, height=200) {
        return this._template.replace(/\{width\}/g, width)
            .replace(/\{height\}/g, height)
            .replace(/\{path\}/g, str)
            .replace(/\{fill_color\}/g, fill_color);
    }
}
SVG._template =
`<svg width="{width}" height="{height}" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
<path d="{path}" fill="{fill_color}"/>
</svg>`;

