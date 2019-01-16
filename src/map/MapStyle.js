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
        };
    }

    componentDidUpdate(prevProps, prevState) 
    {
        if (prevProps.styleId !== this.props.styleId) this.setState({styleId:this.props.styleId});
    }
    
    handleCollapse = () => 
    {
        this.setState(prevState => ({open: !prevState.open}));
    }

    handleStyleChange = styleId => 
    {
        this.setState({styleId: styleId}, () => this.props.map.setStyle(`mapbox://styles/${this.props.owner}/${this.state.styleId}-${this.props.version}`));
    }

    render() 
    {
        const layerList = this.props.styles.map(styleId => 
        {
            const isSelected = (styleId === this.state.styleId);
            return (
                <ListItem button key={styleId} onClick={evt => {this.handleStyleChange(styleId)}}>
                    <ListItemText primary={styleId} />{isSelected && (<ListItemIcon><CheckCircle color="secondary" /></ListItemIcon>)}
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
    styles: ['basic', 'streets', 'bright', 'light', 'dark', 'satellite'],
    owner: 'mapbox',
    styleId: 'basic',
    version: 'v9',
};