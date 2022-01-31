//import React
import React, {useState, useEffect} from 'react'

//import Layout Admin
import LayoutAdmin from '../../../layouts/Admin';

//import BASE URL API
import Api from '../../../api';

//import hook history from react-router-dom
import {useHistory,useParams} from 'react-router-dom';

//import js cookie
import Cookies from 'js-cookie';

//import toats
import toast from 'react-hot-toast';

function CategoryEdit() {
    //document title page = "Add new Category - Administrator Travel GIS"
    document.title = "Edit Category - Administrator Travel GIS";

    //state name initial empty
    const [name, setName] = useState('');
    //state image initial empty
    const [image, setImage] = useState('');
    //state validation initial object
    const [validation, setValidation] = useState({});

    //get token from cookie
    const token = Cookies.get('token');

    //history
    const history = useHistory();

    //get id from paramater url
    const {id} = useParams();

    //function get data category by id
    const getCategoryById = async () => {
        //get data from server
        const response = await Api.get(`/categories/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        //get response data set to const data
        const data = response.data.data;

        //assign data to state name
        setName(data.name);
    }

    //hook use effect
    useEffect(() => {
        //get data category by id
        getCategoryById();
    }, []);

    const handleFileChange = (e) => {
        //define variable for get value image data
        const imageData = e.target.files[0];
        if(!imageData.type.match('image.*')){
            //set state image empty
            setImage('');
            //show toast error message "Format file not support"
            toast.error('Format file not support', {
                duration:4000,
                position: "top-right",
                style: {
                    borderRadius: "10px",
                    background: '#333',
                    color: '#fff',
                }
            });
            return;
        }
        setImage(imageData);
    }

    //arrow function "storeCategory"
    const updateCategory = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();
        //append image to formData
        formData.append('image', image);
        //append name to formData
        formData.append('name', name);
        //append _method value 'PATCH'
        formData.append('_method', 'PATCH');

        await Api.post(`/api/admin/categories/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            //show toast success message "Update category success"
            toast.success('Update category success', {
                duration:4000,
                position: "top-right",
                style: {
                    borderRadius: "10px",
                    background: '#333',
                    color: '#fff',
                }
            });
            //redirect to page "/admin/categories"
            history.push('/admin/categories');
        }).catch(err => {
            //show toast error message "Update category failed"
            toast.error('Update category failed', {
                duration:4000,
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
                        <span className="font-weight-bold"><i className="fa fa-folder"></i> EDIT CATEGORY</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateCategory}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Image</label>
                                <input type="file" className="form-control" onChange={handleFileChange}/>
                            </div>
                            {validation.image && (
                                <div className="alert alert-danger" role="alert">
                                    {validation.image[0]}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Category Name</label>
                                <input type="text" className="form-control"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Category Name" />
                            </div>
                            {validation.name && (
                                <div className="alert alert-danger" role="alert">
                                    {validation.name[0]}
                                </div>
                            )}
                            <div>
                                <button type="submit" className="btn btn-success btn-md me-2"><i className="fa fa-save"></i> UPDATE</button>
                                <button type="reset" className="btn btn-md btn-warning"><i className="fa fa-redo"></i> RESET</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </LayoutAdmin>)
}

export default CategoryEdit;