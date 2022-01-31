//import react router dom
import {Route, Switch} from 'react-router-dom';

//import component private routes
import PrivateRoutes from './PrivateRoutes';

//===================================================
// ADMIN
//===================================================

//import view login
import Login from '../pages/Login'

//import view admin dashboard
import Dashboard from '../pages/admin/dashboard/Index'
import CategoriesIndex from "../pages/admin/categories/Index";
import CategoryCreate from "../pages/admin/categories/Create";
import CategoryEdit from "../pages/admin/categories/Edit";
import PlacesIndex from "../pages/admin/places/Index";
import PlaceCreate from "../pages/admin/places/Create";
import PlaceEdit from "../pages/admin/places/Edit";
import SlidersIndex from "../pages/admin/sliders/Index";
import SliderCreate from "../pages/admin/sliders/Create";
import UsersIndex from "../pages/admin/users/Index";
import UserCreate from "../pages/admin/users/Create";
import UserEdit from "../pages/admin/users/Edit";

//===================================================
// WEB
//===================================================

//import HOME
import Home from '../pages/web/home/Index'
//import Category Show
import WebCategoryShow from '../pages/web/categories/Show'
//import WebPlaceIndex
import WebPlacesIndex from "../pages/web/places/Index";
import WebPlaceShow from "../pages/web/places/Show";
import WebPlaceDirection from "../pages/web/places/Direction";
import WebMapsIndex from "../pages/web/maps/Index";
import WebsiteSearch from "../pages/web/search/Index";

function Routes() {
    return (
        <Switch>
            <Route exact path="/admin/login">
                <Login/>
            </Route>

            {/*Private Route "admin/dashboard"*/}
            <PrivateRoutes exact path="/admin/dashboard">
                <Dashboard/>
            </PrivateRoutes>
            {/*Private Route "admin/categories"*/}
            <PrivateRoutes exact path="/admin/categories">
                <CategoriesIndex/>
            </PrivateRoutes>
            {/*Private Route "admin/categories/create"*/}
            <PrivateRoutes exact path="/admin/categories/create">
                <CategoryCreate/>
            </PrivateRoutes>
            {/*Private Route "admin/categories/edit/:id"*/}
            <PrivateRoutes exact path="/admin/categories/edit/:id">
                <CategoryEdit/>
            </PrivateRoutes>
            {/*Private Route "admin/places"*/}
            <PrivateRoutes exact path="/admin/places">
                <PlacesIndex/>
            </PrivateRoutes>
            {/*Private Route "admin/places/create"*/}
            <PrivateRoutes exact path="/admin/places/create">
                <PlaceCreate/>
            </PrivateRoutes>
            {/*Private Route "admin/places/edit/:id"*/}
            <PrivateRoutes exact path="/admin/places/edit/:id">
                <PlaceEdit/>
            </PrivateRoutes>
            {/*Private Route "admin/sliders"*/}
            <PrivateRoutes exact path="/admin/sliders">
                <SlidersIndex/>
            </PrivateRoutes>
            Private Route "admin/sliders/create"
            <PrivateRoutes exact path="/admin/sliders/create">
                <SliderCreate/>
            </PrivateRoutes>
            {/*Private Route "admin/users"*/}
            <PrivateRoutes exact path="/admin/users">
                <UsersIndex/>
            </PrivateRoutes>
            {/*Private Route "admin/categories/create"*/}
            <PrivateRoutes exact path="/admin/users/create">
                <UserCreate/>
            </PrivateRoutes>
            {/*Private Route "admin/categories/edit/:id"*/}
            <PrivateRoutes exact path="/admin/users/edit/:id">
                <UserEdit/>
            </PrivateRoutes>

            {/*Public Route "home"*/}
            <Route exact path="/">
                <Home/>
            </Route>
            {/*Public Route "category/:slug"*/}
            <Route exact path="/category/:slug">
                <WebCategoryShow/>
            </Route>
            {/*Public Route "places"*/}
            <Route exact path="/places">
                <WebPlacesIndex />
            </Route>
            {/*Public Route "places/:slug"*/}
            <Route exact path="/place/:slug">
                <WebPlaceShow/>
            </Route>
            {/*Public Route "places/:slug/direction"*/}
            <Route exact path="/place/:slug/direction">
                <WebPlaceDirection />
            </Route>
            {/*Public Route "maps/"*/}
            <Route exact path="/maps">
                <WebMapsIndex />
            </Route>
            {/*Public Route "search/"*/}
            <Route exact path="/search">
                <WebsiteSearch />
            </Route>
        </Switch>
    )
}

export default Routes;