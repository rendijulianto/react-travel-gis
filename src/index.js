import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import Browser from react router
import { BrowserRouter } from 'react-router-dom';

//import CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//import mapbox gl css
import 'mapbox-gl/dist/mapbox-gl.css';

//maxbox gl css
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

//mapbox gl directions css
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

//import assets/css/style.css
import './assets/css/styles.css';

ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter>
       <App />
   </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
