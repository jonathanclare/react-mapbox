import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Brush from '@material-ui/icons/Brush';
import CheckCircle from '@material-ui/icons/CheckCircle';

export default class MapStyle extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            open: false,
            styleId: props.styleId,
            version: props.version, 
        };
    }

    componentDidUpdate(prevProps, prevState) 
    {
        const newState = {};
        if (prevProps.styleId !== this.props.styleId || prevState.styleId !== this.state.styleId) newState.styleId = this.props.styleId;
        if (prevProps.version !== this.props.version || prevState.version !== this.state.version) newState.version = this.props.version;
        if (Object.keys(newState).length !== 0) this.updateMapStyle();
    }
    
    updateMapStyle()
    {
        this.props.map.setStyle(`mapbox://styles/mapbox/${this.state.styleId}-${this.state.version}`);
    }
    
    handleCollapse = () => 
    {
        this.setState(state => ({open: !state.open}));
    }

    handleStyleChange = id => 
    {
        this.setState({styleId: id});
    }

    render() 
    {
        const layerList = this.props.layerIds.map(id => 
        {
            const isSelected = (id === this.state.styleId);
            return (
                <ListItem button key={id} onClick={evt => {this.handleStyleChange(id)}}>
                    <ListItemText primary={id} />
                    {isSelected && (<ListItemIcon><CheckCircle color="secondary" /></ListItemIcon>)}
                </ListItem>
            );
        });
        return (
            <List>
                <ListItem button onClick={this.handleCollapse}>
                    <ListItemIcon><Brush  /></ListItemIcon>
                    <ListItemText primary="Map Style"  />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>{layerList}</List>
                </Collapse>
            </List>
        );
    }
}

MapStyle.defaultProps = 
{
    layerIds: ['basic', 'streets', 'bright', 'light', 'dark', 'satellite'],
    styleId: 'basic',
    version: 'v9',
};