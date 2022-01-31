import React, {useEffect, useState, useRef} from "react";

import LayoutWeb from '../../../layouts/Web'

import {Link, useParams} from "react-router-dom";

import Api from "../../../api";

//import ImageGallery
import ImageGallery from 'react-image-gallery';

//import ImageGallery CSS
import 'react-image-gallery/styles/css/image-gallery.css';

//import mapbox gl
import mapboxgl from "mapbox-gl";

//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const WebPlaceShow = () => {
    //state place
    const [place, setPlace] = useState({});

    //map container
    const mapContainer = useRef(null);

    //slug useparams
    const {slug} = useParams();

    const fetchDataPlace = async () => {
        await Api.get(`/api/web/places/${slug}`).then((response) => {
            setPlace(response.data.data);
            document.title = `${response.data.data.title} - Website Wisata Berbasis GIS (Geo Information System)`;
        })
    }
    useEffect(() => {
        fetchDataPlace();
    }, []);

    //=====================================================
    // react image gallery
    //=====================================================

    //define image array
    const images = [];

    //function placeImages
    const placeImages = () => {
        //loop data image
        for (let value in place.images) {
            //push to image array
            images.push({
                original: `${place.images[value].image}`,
                thumbnail: `${place.images[value].image}`,
            })
        }
    }


    //=====================================================
    // MAPBOX
    //=====================================================

    const initMap = () => {
        //init map

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [place.longitude ? place.longitude : "", place.latitude ? place.latitude : ""],
            zoom: 15,
        });

        //init popup
        new mapboxgl.Popup({
            closeOnClick: false
        }).setLngLat([
            place.longitude ? place.longitude : "",
            place.latitude ? place.latitude : ""
        ]).setHTML(`<h6>${place.title} <hr /></h6><p><i>${place.address}</i></p>`).addTo(map);
    }

    useEffect(() => {
        placeImages();
        initMap()
    });

    return (<React.Fragment>
        <LayoutWeb>
            <div className="container mt-80">
                <div className="row">
                    <div className="col-md-7 mb-4">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <h4>{place.title}</h4>
                                <span className="card-text">
                                        <i className="fa fa-map-marker"></i>
                                        <i>{place.address}</i>
                                    </span>
                                <hr/>
                                <ImageGallery items={images} autoPlay={true}/>
                                <div dangerouslySetInnerHTML={{__html: place.description}}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mb-4">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <h5>
                                    <i className="fa fa-marker-alt"></i>
                                    MAPS
                                </h5>
                                <hr/>
                                <div ref={mapContainer} className="map-container" style={{height: "350px"}}/>
                                <div className="d-grid gap-2">
                                    <Link
                                        to={`/place/${slug}/direction?longitude=${place.longitude}&latitude=${place.latitude}`}
                                        className="float-end btn btn-success btn-clock btn-md mt-3">
                                        <i className="fa fa-location-arrow"></i> OPEN DIRECTION
                                    </Link>
                                </div>
                            </div>
                            <hr/>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2 col-2">
                                        <div className="icon-info-green">
                                            <i className="fa fa-map-marker-alt"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-10 col-10">
                                        <div className="capt-info fw-bold">ADDRESS</div>
                                        <div className="sub-title-info">{place.address}</div>
                                    </div>
                                    <div className="col-md-2 col-2">
                                        <div className="icon-info-green">
                                            <i className="fa fa-clock"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-10 col-10">
                                        <div className="capt-info fw-bold">OFFICE HOURS</div>
                                        <div className="sub-title-info">{place.office_hours}</div>
                                    </div>
                                    <div className="col-md-2 col-2">
                                        <div className="icon-info-green">
                                            <i className="fa fa-phone"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-10 col-10">
                                        <div className="capt-info fw-bold">PHONE</div>
                                        <div className="sub-title-info">{place.phone}</div>
                                    </div>
                                    <div className="col-md-2 col-2">
                                        <div className="icon-info-green">
                                            <i className="fa fa-globe-asia"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-10 col-10">
                                        <div className="capt-info fw-bold">WEBSITE</div>
                                        <div className="sub-title-info">
                                            <a href={place.website} target="_blank"
                                               className="text-decoration-none">{place.website}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWeb>
    </React.Fragment>)
}

export default WebPlaceShow;