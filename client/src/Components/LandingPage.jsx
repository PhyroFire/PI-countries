import { Link } from "react-router-dom";
import React from "react";
import "../CSS/LandingPage.css"
import video from '../CSS/Videos/IntroVid.mp4'



export default function LandingPage() {
    return (
        <div className="body_landing">

            <div className="landing">

                <video autoPlay preload="auto" loop src={video}></video>
                <Link to='/home'>
                    <h1>Henry's Countries Proyect</h1>
                </Link>
            </div>

            <h3>Welcome to Countries API</h3>
            <p>In this page you can see different countries info with relevant information using the restcountries.com external API. Also you can create activities for each country!</p>

        </div>
    )
}