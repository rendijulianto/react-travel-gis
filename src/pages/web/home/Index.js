//import React from react
import React, {useState,useEffect} from 'react';

//import layout website
import LayoutWeb from '../../../layouts/Web';

//import Slider Component
import Slider from '../../../components/web/Slider';

//import Api
import Api from '../../../api';

//import components/CardCategory
import CardCategory from '../../../components/utilities/CardCategory';

//import {useHistory} from react-router-dom
import {useHistory} from 'react-router-dom';

const Home = () => {

    document.title ="TRAVEL GIS - Website Wisata Berbasis GIS (Geographic Information System)";

    //history
    const history = useHistory();

    //state categories
    const [categories, setCategories] = useState([]);

    //state keyword
    const [keyword, setKeyword] = useState('');



    //function fetchDataCategories
    const fetchDataCategories = async () => {
        //fetching rest api
        await Api.get('/api/web/categories').then((response) => {
            setCategories(response.data.data);
        })
    }


    useEffect(() => {
        fetchDataCategories();
    }, []);

    //function searchHandler
    const searchHandler = () => {
        //redirect with params keyword
        history.push(`/search?keyword=${keyword}`);
    }
    return (
        <LayoutWeb>
            <Slider />
            <div className="container mt-5">
                <div className="row mt-minus-87">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <h5>
                                    <i className="fa fa-search"></i> FIND YOUR FAVORITE PLACE
                                </h5>
                                <p>Find your favorite place to vacation with your family!</p>
                                <hr />
                                <input  type="text" className="form-control" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && searchHandler()} placeholder="find your destination here..."/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    {
                        categories.map((category, index) => {
                            return (
                                <CardCategory
                                    key={category.id}
                                    id={category.id}
                                    name={category.name}
                                    slug={category.slug}
                                    image={category.image}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </LayoutWeb>
    )
}

export  default Home;