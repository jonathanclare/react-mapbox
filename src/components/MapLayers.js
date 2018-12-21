import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Brush from '@material-ui/icons/Brush';

export default class MapLayers extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            open: false,
            style: {},
        };
    }

    handleCollapse = () => 
    {
        this.setState(prevState => ({open: !prevState.open}));
    }

    componentDidMount()
    {
        this.attachMapListener();
    }

    componentDidUpdate(prevProps, prevState) 
    {
        if (prevProps.map !== this.props.map) 
        {
            if (prevProps.map !== undefined) this.props.map.off('styledata', this.updateStyle);
            this.attachMapListener();
        }
    }

    attachMapListener()
    {
        if (this.props.map !== undefined) this.props.map.on('styledata', this.updateStyle);
    }

    updateStyle = () =>
    {
        this.setState({style: this.props.map.getStyle()});
    }

    handleLayerClick = layer => 
    {
        console.log(layer)
    }

    render() 
    {
        console.log(this.state.style)
        const {version, name, metadata, sources, layers} = this.state.style;

        let layerList = [];
        if (layers !== undefined)
        {
            layerList = layers.map(layer => 
            {
                const layerName = (layer.name ? layer.name : layer.id);

                let layerShape;
                switch(layer.type)
                {
                    case 'background':
                        layerShape = <rect width="20" height="20" 
                                        style={{fill:layer.paint['background-color']}} />;
                        break;
                    case 'fill':
                        layerShape = <rect width="20" height="20" 
                                        style={{fill:layer.paint['fill-color'], 
                                        fillOpacity:layer.paint['fill-opacity']}} />;
                        break;
                    case 'line':
                        layerShape = <line x1="0" y1="0" x2="20" y2="0" 
                                        style={{stroke:layer.paint['line-color'], 
                                        strokeWidth:layer.paint['line-width'], 
                                        strokeOpacity:layer.paint['line-opacity'], 
                                        strokeDasharray:layer.paint['line-dasharray']}} />;
                        break;
                    default:
                        layerShape = null;
                }
                const layerSymbol = (<svg width="20" height="20">{layerShape}</svg>);

                return (
                    <ListItem button key={layer.id} onClick={evt => {this.handleLayerClick(layer)}}>
                        <ListItemIcon>{layerSymbol}</ListItemIcon>
                        <ListItemText primary={layerName} />
                    </ListItem>
                );
            });
        }
        return (
            <List>
                <ListItem button onClick={this.handleCollapse}>
                    <ListItemIcon><Brush  /></ListItemIcon>
                    <ListItemText primary={`Style: ${name ? name : ''}`} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>{layerList}</List>
                </Collapse>
            </List>
        );
    }
}