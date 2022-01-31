//import React
import React, {useState, useEffect} from 'react';

//import LayoutsWeb
import LayoutsWeb from '../../../layouts/Web';

//import API
import Api from '../../../api'

import CardPlace from '../../../components/utilities/CardPlace';

import PaginationComponent from '../../../components/utilities/Pagination';

function WebPlacesIndex() {
    //title
    document.title ="Places - TRAVEL GIS - Website Wisata Berbasis GIS(Geographic Information System)";

    //state places
    const [places, setPlaces] = useState([]);

    //state currentPage
    const [currentPage, setCurrentPage] = useState(1);

    //state perPage
    const [perPage, setPerPage] = useState(0);

    //state total
    const [total, setTotal] = useState(0);

    //function "fetchDataPlaces"
    const fetchDataPlaces = async (pageNumber) => {

        //define variable page
        const page = pageNumber ? pageNumber :currentPage;
        await Api.get(`/api/web/places?page=${page}`).then((response) => {
            setPlaces(response.data.data.data);
            setCurrentPage(response.data.data.current_page);
            setPerPage(response.data.data.per_page);
            setTotal(response.data.data.total);
        });
    }

    useEffect(() => {
        fetchDataPlaces();
    }, []);

    return (
        <React.Fragment>
            <LayoutsWeb>
                <div className="container mt-80">
                    <div className="row">
                        {
                            places.length > 0
                            ? places.map((places) => (
                                <CardPlace
                                    key={places.id}
                                    id={places.id}
                                    slug={places.slug}
                                    title={places.title}
                                    images={places.images}
                                    address={places.address}
                                />
                                ))
                                : <div className="alert alert-danger border-0 rounded shadow-sm" role="alert">
                                    <strong>Opps..!</strong> Data Belum Tersedia!!
                                </div>
                        }
                    </div>
                    <PaginationComponent
                        currentPage={currentPage}
                        perPage={perPage}
                        total={total}
                        onChange={(pageNumber) => setCurrentPage(pageNumber)}
                        position="center"
                    />
                </div>
            </LayoutsWeb>
        </React.Fragment>
    )
}

export default WebPlacesIndex;