import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import Map from '../map/Map';
import MapStyle from '../map/MapStyle';
import MapLayers from '../map/MapLayers';
import addWindLayer from  '../wind/addWindLayer';

const drawerWidth = 240;

const styles = theme => (
{
    root: 
    {
        
    },
    grow:
    {
        flexGrow: 1,
    },
    appBar: 
    {
        transition: theme.transitions.create(['margin', 'width'], 
        {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: 
    {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], 
        {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: 
    {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: 
    {
        display: 'none',
    },
    drawer: 
    {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: 
    {
        width: drawerWidth,
    },
    drawerHeader: 
    {
        display: 'flex',
        alignItems: 'center',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: 
    {
        display: 'flex',
        flexFlow: 'column nowrap',
        overflow: 'hidden',
        position: 'absolute',
        'top': 0,
        'bottom': 0,
        'left':0,
        'right':0,
    },
    mapContainer: 
    {
        display: 'flex',
        flex: '1 1 auto',
    },
});

class Layout extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            open: false,
            map: undefined,
        };
        this._isMounted = false;

        // Custom theme.
        this._theme = createMuiTheme(
        {
            palette: 
            {
                primary: 
                {
                    main: '#00bcd4',
                    contrastText: '#fff',
                },
                secondary: 
                {
                    main: '#ff1744',
                    contrastText: '#fff',
                },
            },
            typography: 
            {
                useNextVariants: true, // https://material-ui.com/style/typography/#migration-to-typography-v2
            },
        });
    }
    
    componentDidMount()
    {
        this._isMounted = true;
    }  

    componentWillUnmount()
    { 
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) 
    {
        
    }

    handleDrawerOpen = () => 
    {
        this.setState({open: true});
    }

    handleDrawerClose = () => 
    {
        this.setState({open: false});
    }

    handleMapLoad = map => 
    {
        this.setState({map: map});
    }

    handleMenuClick(text) 
    {
        console.log(text);
    }

    handleWindClick = () => 
    {
        addWindLayer(this.state.map)
    }

    render() 
    {
        const {classes, theme} = this.props;
        const {open, map} = this.state;

        return (
            <MuiThemeProvider theme={this._theme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classNames(classes.appBar, {[classes.appBarShift]: open,})}>
                        <Toolbar disableGutters={!open}>
                            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide)} >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap className={classes.grow}>Map</Typography>
                            <Button color="inherit" onClick={this.handleWindClick}>Wind</Button>
                        </Toolbar>
                    </AppBar>
                    <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{paper: classes.drawerPaper,}}>
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                        </div>
                        <Divider />

                        {map && (
                            <React.Fragment>
                                <List>
                                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                        <ListItem button key={text} onClick={evt => {this.handleMenuClick(text)}}>
                                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                                <List>
                                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                        <ListItem button key={text} onClick={evt => {this.handleMenuClick(text)}}>
                                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                                <MapStyle map={map} styleId="streets"></MapStyle>
                                <Divider />
                                <MapLayers map={map} ></MapLayers>
                                <Divider />
                            </React.Fragment>
                        )}
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.drawerHeader} />
                        <div className={classes.mapContainer}>
                            <Map accessToken="pk.eyJ1Ijoiam9uYXRoYW5jbGFyZSIsImEiOiJjanBjczd0cmwwYjM4M3BudjV2M3lvdHZ5In0.TerFDj6LBma-HNs0Np0Wtg" onLoad={this.handleMapLoad}  />
                        </div>
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

Layout.propTypes = 
{
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Layout);