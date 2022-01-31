import React from 'react';

//import Link
import {Link, useLocation} from 'react-router-dom';

function Sidebar() {

    //assigning the location to a variable
    const location = useLocation();

    //destructuring pathname from location
    const {pathname} = location;

    //javascript slit method to get the name of the path in array
    const splitLocation = pathname.split('/');

    return (
        <React.Fragment>
            <div className="list-group list-group-push">
                <Link
                    to="/admin/dashboard"
                    className={splitLocation[2] === "dashboard" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"}>
                    <i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
                <Link
                    to="/admin/categories"
                    className={splitLocation[2] === "categories" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"}>
                    <i className="fa fa-folder me-2"></i>Categories</Link>
                <Link
                    to="/admin/places"
                    className={splitLocation[2] === "places" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"}>
                    <i className="fa fa-map-marked-alt me-2"></i>Places</Link>
                <Link
                    to="/admin/sliders"
                    className={splitLocation[2] === "sliders" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"}>
                    <i className="fa fa-images me-2"></i>Sliders</Link>
                <Link
                    to="/admin/users"
                    className={splitLocation[2] === "users" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"}>
                    <i className="fa fa-users me-2"></i>Users</Link>
            </div>
        </React.Fragment>
    )
}

export default Sidebar;