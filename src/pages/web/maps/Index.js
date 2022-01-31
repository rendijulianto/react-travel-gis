//import react
import React, {useRef, useEffect, useState} from 'react';


//import layout web
import LayoutWeb from '../../../layouts/Web';

import Api from '../../../api';

import mapboxgl from "mapbox-gl";

//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const WebMapsIndex = () => {

    document.title = "Maps - Travels GIS - Website Berbasis Gis (Geographic Information System)";

    //map container
    const mapContainer = useRef(null);

    //state coordinates initial array
    const [coordinates, setCoordinates] = useState([]);

    //function "fetchDataPlaces"
    const fetchDataPlaces = async () => {
        //fetching Rest Api
        await Api.get('/api/web/all_places').then((response) => {
            //set coordinates
            setCoordinates(response.data.data);
        });
    }
    useEffect(() => {
        //fetch data places
        fetchDataPlaces();
    }, []);

    useEffect(() => {
        //init map
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [116.5519982204172, -2.8989093904502283],
            zoom: 4
        });

        //create a default maker and add it to the map
        coordinates.forEach((location) => {
            //add popup
            const popup = new mapboxgl.Popup()
                .setHTML(`<h6>${location.title}</h6><hr/><p><i class="fa fa-map-marker"></i> <i>${location.address}</i></p><hr/><div class="d-grid gap-2"><a href="/places/${location.slug}" class="btn btn-sm btn-success btn-block text-white">Lihat Selengkapnya</a></div>`)
                .addTo(map);

            //add marker to map
            new mapboxgl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .setPopup(popup)
                .addTo(map);
        })
    })
    return (
        <LayoutWeb>
            <div className="container mt-80">
                <div className="row">
                    <div className="col-md-12 mb-5">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body"><h5><i className="fa fa-map-marked-alt"></i> SEMUA DATA VERSI MAPS</h5>
                                <hr />
                                <div ref={mapContainer} className="map-container" style={{ height: "450px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWeb>
    );
};

export default WebMapsIndex;