import React, {useState,useEffect} from "react";


//import component Navbar,Container,Nav,NavDropdown from react-bootstrap
import {Navbar, Nav, NavDropdown, Container, Modal} from 'react-bootstrap';
//import Link From react-router-dom
import {Link,useHistory} from 'react-router-dom';

//import API
import Api from '../../api';

import Cookies from "js-cookie";


const WebHeader = () => {

    //state categories
    const [categories, setCategories] = useState([]);
    //state user
    const [user, setUser] = useState({});

    //modal search
    const [modal, setModal] = useState(false);

    //state keyword
    const [keyword, setKeyword] = useState('');

    //history
    const history = useHistory();

    //token
    const token = Cookies.get('token');

    //function fecthDataCategories
    const fecthDataCategories = async () => {
        await Api.get('/api/web/categories').then((response) => {
            setCategories(response.data.data);
        });
    }
    //function fetchDataUser
    const fetchDataUser = async () => {
        //fetching rest api
        await Api.get('/api/admin/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setUser(response.data);
        })
    }

    //hook
    useEffect(() => {
        if(token) {
            fetchDataUser();
        }
        fecthDataCategories();
    }, []);

    const searchHandler = () => {
        history.push('/search?q='+keyword);

        setModal(false);
    }

    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" className="navbar-custom shadow-sm" fixed="top">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold text-white"><i
                        className="fa fa-map-marked-alt"></i> TRAVEL GIS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title={<span><i className="fa fa-list-ul"></i> CATEGORIES</span>}
                                         id="collasible-nav-dropdown"
                                         className="fw-bold text-white">
                                {
                                    categories.map((category) => (
                                       <NavDropdown.Item as={Link} to={`/category/${category.slug}`} key={category.id}>
                                            <img src={category.image} style={{width:"35px"}}  alt=""/>
                                           {category.name.toUpperCase()}
                                       </NavDropdown.Item>
                                    ))
                                }
                                <NavDropdown.Divider/>
                                <NavDropdown.Item as={Link} to="/posts/direction">LIHAT LAINNYA <i className="fa fa-long-arrow-alt-right"></i></NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/places" className="fw-bold text-white">
                                <i className="fa fa-globe-asia"></i> PLACES
                            </Nav.Link>
                            <Nav.Link as={Link} to="/maps" className="fw-bold text-white">
                                <i className="fa fa-map-marked-alt"></i> MAPS
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => setModal(true)} className="fw-bold text-white me-4"><i className="fa fa-search"></i> SEARCH</Nav.Link>
                            {token ?
                                <Link  to="/admin/dashboard" className="btn btn-md btn-light text-uppercase fw-bold"><i className="fa fa-user-circle"></i> {user.name}</Link>
                                :
                                <Link  to="/admin/login" className="btn btn-md btn-light fw-bold me-4"><i className="fa fa-lock"></i> LOGIN</Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal
            size="lg"
            show={modal}
            onHide={() => setModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <i className="fa fa-search"></i> SEARCH
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Find your destionation here..." value={keyword} onKeyPress={(e) => e.key === 'Enter' && searchHandler()} onChange={(e) => setKeyword(e.target.value) } />
                        <button className="btn btn-md btn-success" type="submit" onClick={searchHandler}><i className="fa fa-search"></i> SEARCH</button>
                    </div>
                </Modal.Body>

            </Modal>
        </React.Fragment>)
};

export  default WebHeader;