import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const year = props => <span>{props.msg}</span>
const Footer = () => {
    return(
        <footer className="page-footer footer-dark bg-dark expand-lg">
            <div className="footer-copyright text-center text-light py-3">Copyright HAP © {year({msg: new Date().getFullYear()})}</div>
        </footer>
    );
}

export default Footer;