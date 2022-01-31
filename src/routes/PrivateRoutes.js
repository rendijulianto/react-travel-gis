//import Cookies
import Cookies from 'js-cookie';

//import react router dom
import {  Route, Redirect } from 'react-router-dom';


//function PrivateRoute
function PrivateRoutes({children, ...rest}) {
     //token from cookies
     const token = Cookies.get('token');

     return (
         <Route {...rest}>
             {token ? children : <Redirect to='/admin/login' />}
         </Route>
     )

}

export default  PrivateRoutes;