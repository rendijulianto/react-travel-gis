//import React
import React, {useState} from 'react'

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

function SliderCreate() {
    //document title page = "Add new Slider - Administrator Travel GIS"
    document.title = "Add new Slider - Administrator Travel GIS";

    //state image initial empty
    const [image, setImage] = useState('');
    //state validation initial object
    const [validation, setValidation] = useState({});

    //get token from cookie
    const token = Cookies.get('token');

    //history
    const history = useHistory();

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

    //arrow function "storeSlider"
    const storeSlider = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();
        //append image to formData
        formData.append('image', image);

        await Api.post('/api/admin/sliders', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            //show toast success message "Add new Slider success"
            toast.success('Add new Slider success', {
                duration:4000,
                position: "top-right",
                style: {
                    borderRadius: "10px",
                    background: '#333',
                    color: '#fff',
                }
            });
            //redirect to page "/admin/sliders"
            history.push('/admin/sliders');
        }).catch(err => {
            //show toast error message "Add new Slider fail"
            toast.error('Add new Slider fail', {
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
                        <span className="font-weight-bold"><i className="fa fa-folder"></i> ADD NEW SLIDER</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={storeSlider}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Image</label>
                                <input type="file" className="form-control" onChange={handleFileChange}/>
                            </div>
                            {validation.image && (
                                <div className="alert alert-danger" role="alert">
                                    {validation.image[0]}
                                </div>
                            )}

                            <div>
                                <button type="submit" className="btn btn-success btn-md me-2"><i className="fa fa-save"></i> SAVE</button>
                                <button type="reset" className="btn btn-md btn-warning"><i className="fa fa-redo"></i> RESET</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </LayoutAdmin>)
}

export default SliderCreate;