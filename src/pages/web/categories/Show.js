//import react
import React, {useState,useEffect} from 'react';

//import layout web
import LayoutWeb from '../../../layouts/Web';

//import useParams
import {useParams} from 'react-router-dom';

//import BASE URL API
import Api from '../../../api';

//import card place component
import CardPlace from '../../../components/utilities/CardPlace';

const WebCategoryShow = () =>{
    //set state category
    const [category, setCategory] = useState({});
    const [places, setPlaces] = useState([]);

    //get params
    const {slug} = useParams();

    //function fetchDataCategory

    const fetchDataCategory = async () => {
        await Api.get('/api/web/categories/'+slug).then((response) => {
            setCategory(response.data.data);
            //set data to state places
            setPlaces(response.data.data.places);

            document.title = `Category : ${response.data.data.name} - Website Wisata Berbasis GIS (Geograpic Information System)`;
        })
    }
    useEffect(() => {
        fetchDataCategory();
    }, [slug]);
    return(
        <React.Fragment>
            <LayoutWeb>
                <div className="container mt-80">
                    {
                        places.length > 0 ?
                            places.map((place) => (
                                <CardPlace
                                    key={place.id}
                                    id={place.id}
                                    slug={place.slug}
                                    title={place.title}
                                    images={place.images}
                                    address={place.address}
                                />
                            ))
                            : <div>
                                <h1 className="text-center">Category : {category.name}</h1>
                                <p className="text-center">Belum ada tempat wisata di kategori ini</p>
                            </div>
                    }
                </div>
            </LayoutWeb>
        </React.Fragment>
    )
}

export  default WebCategoryShow;