//import React
import React, {useState, useEffect} from 'react'

//import Layout Admin
import LayoutAdmin from '../../../layouts/Admin';

//import BASE URL API
import Api from '../../../api';

//import hook history from react-router-dom
import {useHistory, useParams } from 'react-router-dom';

//import js cookie
import Cookies from 'js-cookie';

//import toats
import toast from 'react-hot-toast';

function UserEdit() {
    //title page
    document.title = "Edit User - Administrator Travel GIS";

    //state name initial empty
    const [name, setName] = useState('');
    //state email initial empty
    const [email, setEmail] = useState('');
    //state password intial empty
    const [password, setPassword] = useState('');
    //state passwordConfirmation initial empty
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    //state validation initial object
    const [validation, setValidation] = useState({});

    //get token from cookie
    const token = Cookies.get('token');

    //history
    const history = useHistory();

    //get ID from parameter URL
    const { id } = useParams();


    //function "getUserById"
    const getUserById = async () => {

        //get data from server
        const response = await Api.get(`/api/admin/users/${id}`, {

            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        });

        //get response data
        const data = await response.data.data

        //assign data to state "name"
        setName(data.name);
        //assign data to state "email"
        setEmail(data.email);
    };

    //hook useEffect
    useEffect(() => {

        //panggil function "getUserById"
        getUserById();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //arrow function "storeUser"
    const updateUser = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append name to formData
        formData.append('name', name);
        //append password to formData
        formData.append('password', password);
        //append password_confirmation to formData
        formData.append('email', email);
        formData.append('password_confirmation', passwordConfirmation);
        formData.append('_method', 'PATCH');
        await Api.post(`/api/admin/users/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            //show toast success message "Updated User success"
            toast.success('Updated User success', {
                duration: 4000,
                position: "top-right",
                style: {
                    borderRadius: "10px",
                    background: '#333',
                    color: '#fff',
                }
            });
            //redirect to page "/admin/users"
            history.push('/admin/users');
        }).catch(err => {
            //show toast error message "Updated User fail"
            toast.error('Updated User fail', {
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
    return (<LayoutAdmin>
        <div className="row mt-4">
            <div className="col-12">
                <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header">
                        <span className="font-weight-bold"><i className="fa fa-folder"></i> EDIT USER</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateUser}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Full Name</label>
                                        <input type="text" className="form-control" value={name}
                                               onChange={(e) => setName(e.target.value)} placeholder="Enter Full Name"/>
                                    </div>
                                    {validation.name && (
                                        <div className="alert alert-danger">
                                            {validation.name[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Email Address</label>
                                        <input type="text" className="form-control" value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                               placeholder="Enter Email Address"/>
                                    </div>
                                    {validation.email && (
                                        <div className="alert alert-danger">
                                            {validation.email[0]}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Password</label>
                                        <input type="password" className="form-control" value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               placeholder="Enter Password"/>
                                    </div>
                                    {validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Password Confirmation</label>
                                        <input type="password" className="form-control" value={passwordConfirmation}
                                               onChange={(e) => setPasswordConfirmation(e.target.value)}
                                               placeholder="Enter Password Confirmation"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-success btn-md me-2"><i
                                    className="fa fa-save"></i> UPDATE
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
    </LayoutAdmin>)
}

export default UserEdit;