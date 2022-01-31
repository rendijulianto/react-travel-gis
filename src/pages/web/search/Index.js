import React, {useEffect,useState} from 'react';

//import layout web
import LayoutWeb from '../../../layouts/Web';

//impor api base
import Api from '../../../api';


//import card place component
import CardPlace from '../../../components/utilities/CardPlace';
import {useLocation} from "react-router-dom";
import PaginationComponent from "../../../components/utilities/Pagination";

//import PaginationComponent from '../../../components/utilities/Pagination';



const WebsiteSearch = () => {

    document.title = "Search - Travel GIS - Website Wisata Berbasis (Geographic Information System)";

    //state places
    const [places, setPlaces] = useState([]);

    //state current page
    const [currentPage, setCurrentPage] = useState(1);

    //state perpage
    const [perPage, setPerPage] = useState(0);

    //state total
    const [total, setTotal] = useState(0);

    //query params
    const query = new URLSearchParams(useLocation().search);

    //function "fecthDataPlaces"
    const fecthDataPlace = async (pageNumber) => {
        //define variable page
        const page = pageNumber ? pageNumber :currentPage;

        //fetching api
        await Api.get(`/api/web/places?q=${query.get('q')}&page=${page}`)
            .then((response) => {
                //set places
                setPlaces(response.data.data.data);
                //set current page
                setCurrentPage(response.data.data.current_page);
                //set per page
                setPerPage(response.data.data.per_page);
                //set total
                setTotal(response.data.data.total);
            })
    }
    useEffect(() => {
        fecthDataPlace();
    },[query.get('q')]);
    return (
        <React.Fragment>
            <LayoutWeb>
                <div className="container mt-80">
                    <div className="row">
                        {
                            places.length > 0
                            ? places.map((place) => {
                                return (
                                    <CardPlace
                                        key={place.id}
                                        id={place.id}
                                        slug={place.slug}
                                        title={place.title}
                                        images={place.images}
                                        address={place.address}
                                    />
                                )
                            })
                                : <div className="alert alert-danger border-0 rounded shadow-sm" role="alert">
                                    <strong>Opps...!</strong> Data Belum Tersedia!.
                                </div>
                        }
                    </div>
                    <PaginationComponent
                        currentPage={currentPage}
                        perPage={perPage}
                        total={total}
                        onChange={(pageNumber) => fecthDataPlace(pageNumber)}
                        position="center"
                    />
                </div>
            </LayoutWeb>
        </React.Fragment>
    );
}

export default WebsiteSearch;