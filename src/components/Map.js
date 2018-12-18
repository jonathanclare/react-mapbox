import React, {Component}  from 'react';
import mapboxgl from 'mapbox-gl'
import styles from './Map.module.css';

export default class Map extends Component
{ 
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            lng: props.lng,
            lat: props.lat,
            zoom: props.zoom
        };
        this._isMounted = false;
    }

    componentDidMount()
    {
        this._isMounted = true;

        mapboxgl.accessToken = this.props.accessToken;

        const map = new mapboxgl.Map(
        {
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => 
        {
            console.log(map.getCenter())
            const {lng, lat} = map.getCenter();
            this.setState(
            {
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }   

    componentWillUnmount()
    { 
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) 
    {
        
    }

    render() 
    {
        return (<div ref={el => this.mapContainer = el} className={styles.mapContainer} />)
    }
};

Map.defaultProps = 
{
    lng: 5, 
    lat: 34, 
    zoom: 4
};