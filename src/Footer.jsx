import React from "react";
import { Link } from "react-router-dom";
import instagram from "./assets/images/socials/instagram.svg";
import linkedin from "./assets/images/socials/linkedin.svg";
import linktree from "./assets/images/socials/linktree.png";
import logo from "./assets/images/logo.png";
import "./css/footer.css"

export default function Footer(){
    return (
        <>
            <div id="footer-logo">
                <Link to="https://miiree12lb.site/" target="_blank" rel="noopener noreferrer">
                    <img alt="logo" src={logo} id="footer-logo-image" />
                </Link>
            </div>
            <div id="footer-icons-text">
                <div id="footer-icons">
                    <Link to="https://linktr.ee/miiree12lb" target="_blank" rel="noopener noreferrer"><img alt="linktree" src={linktree} width="50" height="50" /></Link>

                    <Link to="https://www.instagram.com/miiree12lb/" target="_blank" rel="noopener noreferrer"><img alt="instagram" src={instagram} width="50" height="50" /></Link>

                    <Link to="https://www.linkedin.com/in/mireia-lopez-bruch-0b7768241/" target="_blank" rel="noopener noreferrer"><img alt="linkedin" src={linkedin} width="50" height="50" /></Link>  
                </div>
                <div id="footer-text">
                    © Mireia Lopez Bruch - 2025
                </div>
                    
            </div>
        </>
        
    );
}