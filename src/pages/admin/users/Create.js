//import React
import React, {useState, useEffect} from 'react'

//import Layout Admin
import LayoutAdmin from '../../../layouts/Admin';

//import BASE URL API
import Api from '../../../api';

//import hook history from react-router-dom
import {useHistory} from 'react-router-dom';

//import js cookie
import Cookies from 'js-cookie';

//import toats
import toast from 'react-hot-toast';

function UserCreate() {
    //document title page = "Add new User - Administrator Travel GIS"
    document.title = "Add new User - Administrator Travel GIS";

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

    //arrow function "storeUser"
    const storeUser = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append name to formData
        formData.append('name', name);
        //append email to formData
        formData.append('email', email);
        //append password to formData
        formData.append('password', password);
        //append password_confirmation to formData
        formData.append('password_confirmation', passwordConfirmation);
        await Api.post('/api/admin/users', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            //show toast success message "Add new User success"
            toast.success('Add new User success', {
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
            //show toast error message "Add new User fail"
            toast.error('Add new User fail', {
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
                        <span className="font-weight-bold"><i className="fa fa-folder"></i> ADD NEW USER</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={storeUser}>
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
                                    className="fa fa-save"></i> SAVE
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

export default UserCreate;