export default class SVG {
    static getSVGCode(str, fill_color='red', width=200, height=200) {
        return this._template.replace(/\{width\}/g, width)
            .replace(/\{height\}/g, height)
            .replace(/\{path\}/g, str)
            .replace(/\{fill_color\}/g, fill_color);
    }
}
SVG._template =
`<svg width={width} height={height} viewbox='0 0 1 1'>
    <path d='{path}' fill='{fill_color}'/>
</svg>`;

