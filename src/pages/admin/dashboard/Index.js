//import React from react
import React from 'react';

//import layout admin
import LayoutAdmin from "../../layouts/Admin";

function Dashboard() {
    //title page "Dashboard - Administrator Travel GIS"
    document.title = "Dashboard - Administrator Travel GIS";

    return(
        <React.Fragment>
            <LayoutAdmin>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-tachometer-alt">Dashboard</i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </React.Fragment>
    )
}
export default Dashboard