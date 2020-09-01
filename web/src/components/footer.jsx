import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const year = props => <span>{props.msg}</span>
const Footer = () => {
    return(
        <footer className="page-footer footer-light bg-light">
            <div className="footer-copyright text-center py-3">Copyright HAP © {year({msg: new Date().getFullYear()})}</div>
        </footer>
    );
}

export default Footer;