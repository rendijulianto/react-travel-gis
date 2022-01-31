//import hook react
import React, {useState} from 'react';

//import BASE URL API
import Api from '../api';

//import toats
import toast from "react-hot-toast";

//import js cookie
import Cookies from 'js-cookie'

//import react router dom
import {useHistory, Redirect} from 'react-router-dom'

// function Login
function Login() {

    //title page
    document.title = "Login - Admin Travis GIS";

    //state user
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //state loading
    const [isLoading, setLoading] = useState(false);

    //state validation
    const [validation, setValidation] = useState({});

    //history

    const history = useHistory();

    //function "loginHandle"
    const loginHandle = async (e) => {
         e.preventDefault();

         //set state isLoading to "true"
         setLoading(true);

         await Api.post("/api/admin/login", {
             email: email,
             password: password
         }).then((response) => {
             setLoading(false);

             //show toast
             toast.success("Login Success", {
                 position: "top-right",
                 duration: 4000,
                 style: {
                     borderRadius: '10px',
                     background : '#333',
                     color: '#fff',
                 }
             });

             //set Cookie
             Cookies.set("token", response.data.token);

             //redirect to dashboard
             history.push("/admin/dashboard");
         }).catch((error) => {
             setLoading(false);

             setValidation(error.response.data);

             //show toast
             toast.error("Login Failed", {
                 position: "top-right",
                 duration: 4000,
                 style: {
                     borderRadius: '10px',
                     background : '#333',
                     color: '#fff',
                 }
             });
         });
         if(Cookies.get("token")){
             //redirect to dashboard
             return <Redirect to="/admin/dashboard"/>
         }
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 mt-150">
                        <div className="text-center mb-4">
                            <h4><i className="fa fa-map-marked-alt"></i> <strong>TRAVEL GIS</strong></h4>
                        </div>
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <div className="text-center">
                                    <h6 className="fw-bold">Login Admin</h6>
                                    <hr/>
                                </div>
                                {validation.message && (
                                    <div className="alert alert-danger" role="alert">
                                        {validation.message}
                                    </div>
                                )}
                                <form onSubmit={loginHandle}>
                                    <label className="mb-">EMAIL ADDRESS</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                                    </div>
                                    {validation.email && (
                                        <div className="alert alert-danger" role="alert">
                                            {validation.email[0]}
                                        </div>
                                    )}
                                    <label className="mb-1">PASSWORD</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    </div>
                                    {validation.password && (
                                        <div className="alert alert-danger" role="alert">
                                            {validation.password[0]}
                                        </div>
                                    )}
                                    <button className="btn btn-success shadow-sm rounded-sm px-4 w-100" type="submit" disabled={isLoading}>
                                        {isLoading ?"Loading..." : "Login"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;