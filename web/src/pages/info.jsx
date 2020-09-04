import React, { Component,useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

const Info = () => {
    return(
        <div>
                <div id="navbar"><Navbar></Navbar></div>
                <div>
                    here
                </div>
			    <div id="footer"><Footer></Footer></div>
            </div>
    );
}

export default Info;