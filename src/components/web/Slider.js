//import React from react
import React,{useEffect, useState} from 'react';

//import component carousel from react-bootstrap
import {Carousel} from 'react-bootstrap';

//import BASE URL API
import Api  from '../../api';

const Slider = () => {
    //state sliders initial array
    const [sliders, setSliders] = useState([]);

    //function fetchDataSliders
    const fetchDataSliders = async () => {
        //fetch data from API
        await Api.get('/api/web/sliders').then((response) => {
            //set state sliders
            setSliders(response.data.data);
        });
    }

    useEffect(() => {
        //fetch data sliders
        fetchDataSliders();
    }, []);

    return (
        <Carousel prevIcon={<i className="fa fa-chevron-left fa-lg carousel-custom text-dark shadow"></i>} nextIcon={<i className="fa fa-chevron-right fa-lg carousel-custom text-dark shadow"></i>}>
            {sliders.map((slider) => (
                <Carousel.Item key={slider.id}>
                    <img className="d-block w-100" src={slider.image} alt="First Slider" style={{height: "500px", objectFit : "cover"}} />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export  default Slider;