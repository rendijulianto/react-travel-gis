import React from 'react';


//import component Header
import Header from '../components/web/Header';

//import component Footer
import Footer from '../components/web/Footer';

const LayoutWebsite = ({children}) => (
    <React.Fragment>
        <Header />
        {children}
        <Footer />
    </React.Fragment>
);

export default LayoutWebsite;