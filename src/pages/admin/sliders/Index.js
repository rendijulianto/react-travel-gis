//import react
import React, {useState, useEffect} from 'react';

//import layout admin
import LayoutAdmin from '../../../layouts/Admin';

//import BASE URL API
import Api from '../../../api';

//import Link from react-router-dom
import { Link } from 'react-router-dom';

//import react-confirm-alert
import { confirmAlert } from 'react-confirm-alert';

//import toast
import toast from "react-hot-toast"

//import CSS react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';

//import Cookies
import Cookies from 'js-cookie';
import PaginationComponent from "../../../components/utilities/Pagination";


function CategoriesIndex() {
    //title page
    document.title = "Categories - Administrator Travel GIS";

    //state categories initial array
    const [categories, setCategories] = useState([]);

    //state current page initial 1
    const [currentPage, setCurrentPage] = useState(1);

    //state perpage initial 0
    const [perPage, setPerPage] = useState(0);

    //state total initial 0
    const [total, setTotal] = useState(0);

    //state search initial empty
    const [search, setSearch] = useState('');

    //get token from cookies
    const token = Cookies.get('token');

    //function fetch data categories
    const fetchData = async (pageNumber, searchData) => {

        //const variable page
        const page = pageNumber ? pageNumber : currentPage;

        //define variable "searchQuery"
        const searchQuery = searchData ? searchData : search

        //fetch data categories
        await Api.get(`/api/admin/categories?q=${searchQuery}&page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {

            //set data categories
            setCategories(response.data.data.data);

            //set current page
            setCurrentPage(response.data.data.current_page);

            //set total
            setTotal(response.data.data.total);

            //set per page
            setPerPage(response.data.data.per_page);
        })
    }

    //hook
    useEffect(() => {
        //fetch data categories
        fetchData();
    }, []);

    //function handle search
    const searchHandler = (e) => {
        e.preventDefault();

        //call function fetch data categories
        fetchData(1,search);
    }

    //function "deletedCategory"
    const deleteCategory = (id) => {
        //show confirm alert
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await Api.delete(`/api/admin/categories/${id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }).then((response) => {
                            //show toast
                            toast.success("Data Deleted Successfully", {
                                duration: 4000,
                                position: "top-right",
                                style: {
                                    background: '#333',
                                    color: '#fff',
                                    borderRadius: '10px',
                                }
                            });
                            //call function fetch data categories
                            fetchData();
                        }).catch((error) => {
                            //show toast
                            toast.error("Data Deleted Failed", {
                                duration: 4000,
                                position: "top-right",
                                style: {
                                    background: '#333',
                                    color: '#fff',
                                    borderRadius: '10px',
                                }
                            });
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return;
                    }
                }
            ]
        });
    }

    return(
        <React.Fragment>
            <LayoutAdmin>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> CATEGORIES</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={searchHandler} className="form-group">
                                    <div className="input-group mb-3">
                                     <Link to="/admin/categories/create" className="btn btn-success btn-md">
                                         <i className="fa fa-plus-circle"></i> Add New</Link>
                                        <input type="text" className="form-control" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search by category name"/>
                                        <button type="submit" className="btn btn-md btn-success"><i className="fa fa-search"></i> Search</button>
                                    </div>
                                </form>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th scope="col">No.</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Category Name</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {categories.map((category,index) => (
                                            <tr key={index}>
                                                <td className="text-center">{++index + (currentPage-1)*perPage}</td>
                                                <td className="text-center">
                                                    <img src={category.image} alt="" width="50" />
                                                </td>
                                                <td>{category.name}</td>
                                                <td className="text-center">
                                                    <Link to={`/admin/categories/edit/${category.id}`} className="btn btn-sm btn-primary me-2"><i className="fa fa-pencil-alt"></i> </Link>
                                                    <button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-danger">
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <PaginationComponent
                                        currentPage={currentPage}
                                        total={total}
                                        perPage={perPage}
                                        onChange={(pageNumber) => fetchData(pageNumber)}
                                        position="end" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </React.Fragment>
    );
}
export default CategoriesIndex;