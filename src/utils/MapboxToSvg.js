import React from 'react';

export const getLayerStyle = layer =>
{ 
    switch(layer.type)
    {
        case 'background':
            return {fill:layer.paint['background-color']};
        case 'fill':
            return {fill:layer.paint['fill-color'], 
                fillOpacity:layer.paint['fill-opacity']};
        case 'line':
            return {stroke:layer.paint['line-color'], 
                strokeWidth:layer.paint['line-width'], 
                strokeOpacity:layer.paint['line-opacity'], 
                strokeDasharray:layer.paint['line-dasharray']};
        default:
            return {};
    }
}

export const getLayerSymbol = (layer, w, h) =>
{ 
    // background, fill, line, symbol, raster, circle, fill-extrusion, heatmap, hillshade.
    const layerStyle = getLayerStyle(layer);
    let shape;
    switch(layer.type)
    {
        case 'background':
            shape = <rect width={w} height={h} style={layerStyle} />;
            break;
        case 'fill':
            shape = <rect width={w} height={h} style={layerStyle} />;
            break;
        case 'line':
            shape = <line x1="0" y1={h/2} x2={w} y2={h/2} style={layerStyle} />;
            break;
        default:
            shape = null;
    }
    return (<svg width={w} height={h}>{shape}</svg>)
}