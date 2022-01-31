//import React  from react
import React, {useEffect, useState} from 'react';

//import Cookies
import Cookies from 'js-cookie';

//import layout admin
import LayoutAdmin from "../../../layouts/Admin";

//import api from  api
import Api from '../../../api';

function Dashboard() {
    //title page "Dashboard - Administrator Travel GIS"
    document.title = "Dashboard - Administrator Travel GIS";

    //set state categories initial 0
    const [categories, setCategories] = useState(0);
    //set state places initial 0
    const [places, setPlaces] = useState(0);
    //set state sliders initial 0
    const [sliders, setSliders] = useState(0);
    //set state users initial 0
    const [users, setUsers] = useState(0);

    //get token from cookies
    const token = Cookies.get('token');

    //function fecth data

    const fetchData = async () => {
        //fetching data from rest api
        const response = await Api.get('api/admin/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.data.data;

        //assign data to state
        setCategories(data.categories);
        setPlaces(data.places);
        setSliders(data.sliders);
        setUsers(data.users);
    }

    useEffect(() => {
        fetchData();
    }, []);




    return(
        <React.Fragment>
            <LayoutAdmin>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-tachometer-alt"></i> Dashboard
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 col-lg-3 mb-4">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            <div className="card-body p-0 d-flex align-items-center">
                                <div className="bg-primary py-4 px-5 mfe-3" style={{width:"130px"}}>
                                    <i className="fas fa-folder fa-2x text-white"></i>
                                </div>
                                <div>
                                    <div className="text-value text-primary">{categories}</div>
                                    <div className="text-muted text-uppercase font-weight-bold small">Categories</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mb-4">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            <div className="card-body p-0 d-flex align-items-center">
                                <div className="bg-success py-4 px-5 mfe-3" style={{width:"130px"}}>
                                    <i className="fas fa-map-marked-alt fa-2x text-white"></i>
                                </div>
                                <div>
                                    <div className="text-value text-success">{places}</div>
                                    <div className="text-muted text-uppercase font-weight-bold small">Places</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mb-4">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            <div className="card-body p-0 d-flex align-items-center">
                                <div className="bg-warning py-4 px-5 mfe-3" style={{width:"130px"}}>
                                    <i className="fas fa-images fa-2x text-white"></i>
                                </div>
                                <div>
                                    <div className="text-value text-warning">{sliders}</div>
                                    <div className="text-muted text-uppercase font-weight-bold small">Sliders</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mb-4">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            <div className="card-body p-0 d-flex align-items-center">
                                <div className="bg-danger py-4 px-5 mfe-3" style={{width:"130px"}}>
                                    <i className="fas fa-users fa-2x text-white"></i>
                                </div>
                                <div>
                                    <div className="text-value text-danger">{users}</div>
                                    <div className="text-muted text-uppercase font-weight-bold small">Users</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </React.Fragment>
    )
}
export default Dashboard