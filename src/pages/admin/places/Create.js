//import React
import React, {useState, useEffect, useRef} from 'react'

//import Layout Admin
import LayoutAdmin from '../../../layouts/Admin';

//import BASE URL API
import Api from '../../../api';

//import hook history from react-router-dom
import {useHistory} from 'react-router-dom';

//import js cookie
import Cookies from 'js-cookie';

//import toats
import toast from 'react-hot-toast';

//import react quill
import ReactQuill from 'react-quill';

//import quill css
import 'react-quill/dist/quill.snow.css';

//mapbox gl
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

//mapbox gl geocoder
import MapboxGeocoder from 'mapbox-gl-geocoder';

//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function PlaceCreate() {
    //document title page = "Add new Category - Administrator Travel GIS"
    document.title = "Add new Place - Administrator Travel GIS";

    //state title initial value is empty
    const [title, setTitle] = useState('');
    //state CategoryID initial value is empty
    const [categoryID, setCategoryID] = useState('');
    //state description initial value is empty
    const [description, setDescription] = useState('');
    //state phone initial value is empty
    const [phone, setPhone] = useState('');
    //state website initial value is empty
    const [website, setWebsite] = useState('');
    //state office_hours initial value is empty
    const [office_hours, setOffice_hours] = useState('');
    //state address initial value is empty
    const [address, setAddress] = useState('');
    //state latitude initial value is empty
    const [latitude, setLatitude] = useState('');
    //state longitude initial value is empty
    const [longitude, setLongitude] = useState('');
    //state images array / multiple images
    const [images, setImages] = useState([]);
    //state categories initial value is array
    const [categories, setCategories] = useState([]);
    //state validation initial object
    const [validation, setValidation] = useState({});

    //get token from cookie
    const token = Cookies.get('token');

    //history
    const history = useHistory();

    //function "fetchCategories"
    const fetchCategories = async () => {
        //fetch categories
        await Api.get('/api/web/categories', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            //set categories
            setCategories(response.data.data);
        })
    }

    //hook
    useEffect(() => {
        //fetch categories
        fetchCategories();
    }, []);

    const handleFileChange = (e) => {
        //define variable for get value image data
        const imageData = e.target.files;
        Array.from(imageData).forEach(image => {
            if (!image.type.match('image.*')) {
                //set state image empty
                setImages([]);
                //show toast error message "Format file not support"
                toast.error('Format file not support', {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        borderRadius: "10px",
                        background: '#333',
                        color: '#fff',
                    }
                });
                return;
            } else {
                //set state image
                setImages([...e.target.files]);
            }
        })
    }

    //arrow function "storePlace"
    const storePlace = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();
        //append title
        formData.append('title', title);
        //append categoryID
        formData.append('category_id', categoryID);
        //append description
        formData.append('description', description);
        //append phone
        formData.append('phone', phone);
        //append website
        formData.append('website', website);
        //append office_hours
        formData.append('office_hours', office_hours);
        //append address
        formData.append('address', address);
        //append latitude
        formData.append('latitude', latitude);
        //append longitude
        formData.append('longitude', longitude);

        Array.from(images).forEach(image => {
            //append image
            formData.append('images[]', image);
        })

        await Api.post('/api/admin/places', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            //show toast success message "Add new Place success"
            toast.success('Add new Place success', {
                duration: 4000,
                position: "top-right",
                style: {
                    borderRadius: "10px",
                    background: '#333',
                    color: '#fff',
                }
            });
            //redirect to page "/admin/places"
            history.push('/admin/places');
        }).catch(err => {
            //show toast error message "Add new Place fail"
            toast.error('Add new Place fail', {
                duration: 4000,
                position: "top-right",
                style: {
                    borderRadius: "10px",
                    background: '#333',
                    color: '#fff',
                }
            });
            //set state validation
            setValidation(err.response.data);
        });



    }
    //==========================================================
    // MAILBOX
    //==========================================================

    //define state
    const mapContainer = useRef(null);

    useEffect(() => {
        //init map
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 12
        });
        //init geocoder
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker : {
                draggable : true
            },
            mapboxgl: mapboxgl
        });

        //add geocoder to map
        map.addControl(geocoder);

        //init marker
        const marker = new mapboxgl.Marker({
            draggable: true,
            color: "rgb(47 128 237)"
        })

            //set longitude and latitude
            .setLngLat([longitude, latitude])
            //add marker to map
            .addTo(map);
        //geocoder result
        geocoder.on('result', function(e) {
            //remove marker
            marker.remove();

            //set longitude and latitude
            marker.setLngLat(e.result.center)
                //add to map
                .addTo(map);
            //event marker on dragend
            marker.on('dragend', function(e) {
                //set longitude and latitude
                setLongitude(e.target._lngLat.lng);
                setLatitude(e.target._lngLat.lat);
            });
        });
    }, []);
    return (<LayoutAdmin>
        <div className="row mt-4">
            <div className="col-12">
                <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header">
                        <span className="font-weight-bold"><i className="fa fa-map-marked-alt"></i> ADD NEW PLACE</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={storePlace}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Image (<i>select many file</i>)</label>
                                <input type="file" className="form-control" multiple onChange={handleFileChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Title</label>
                                <input type="text" className="form-control" value={title}
                                       onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title"/>
                            </div>
                            {validation.title && (
                                <div className="alert alert-danger" role="alert">
                                    {validation.title[0]}
                                </div>
                            )}
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Category</label>
                                    <select className="form-select" value={categoryID}
                                            onChange={(e) => setCategoryID(e.target.value)}>
                                        <option value="">Select Category</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {validation.category_id && (
                                    <div className="alert alert-danger" role="alert">
                                        {validation.category_id[0]}
                                    </div>
                                )}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Office Hours</label>
                                    <input type="text" className="form-control" value={office_hours}
                                           onChange={(e) => setOffice_hours(e.target.value)}
                                           placeholder="Enter Office Hours"/>
                                </div>
                                {validation.office_hours && (
                                    <div className="alert alert-danger" role="alert">
                                        {validation.office_hours[0]}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Description</label>
                                <ReactQuill theme="snow" rows="5" value={description}
                                            onChange={(content) => setDescription(content)}/>
                            </div>
                            {validation.description && (
                                <div className="alert alert-danger" role="alert">
                                    {validation.description[0]}
                                </div>
                            )}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Phone</label>
                                        <input type="text" className="form-control" value={phone}
                                               onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone"/>
                                    </div>
                                    {validation.phone && (
                                        <div className="alert alert-danger" role="alert">
                                            {validation.phone[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Website</label>
                                        <input type="text" className="form-control" value={website}
                                               onChange={(e) => setWebsite(e.target.value)}
                                               placeholder="Enter Website"/>
                                    </div>
                                    {validation.website && (
                                        <div className="alert alert-danger" role="alert">
                                            {validation.website[0]}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Address</label>
                                <textarea className="form-control" rows="3" value={address}
                                          onChange={(e) => setAddress(e.target.value)}
                                          placeholder="Enter Address Place"></textarea>
                            </div>
                            {validation.address && (
                                <div className="alert alert-danger" role="alert">
                                    {validation.address[0]}
                                </div>
                            )}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Latitude</label>
                                        <input type="text" readOnly className="form-control" value={latitude}
                                               onChange={(e) => setLatitude(e.target.value)}
                                               placeholder="Enter Latitude"/>
                                    </div>
                                    {validation.latitude && (
                                        <div className="alert alert-danger" role="alert">
                                            {validation.latitude[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Longitude</label>
                                        <input type="text" readOnly className="form-control" value={longitude}
                                               onChange={(e) => setLongitude(e.target.value)}
                                               placeholder="Enter Longitude"/>
                                    </div>
                                    {validation.longitude && (
                                        <div className="alert alert-danger" role="alert">
                                            {validation.longitude[0]}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <div ref={mapContainer} className="map-container" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-success btn-md me-2"><i
                                    className="fa fa-save"></i> SAVE
                                </button>
                                <button type="reset" className="btn btn-md btn-warning"><i
                                    className="fa fa-redo"></i> RESET
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </LayoutAdmin>);
}

export default PlaceCreate;