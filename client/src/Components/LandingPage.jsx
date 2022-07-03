import { Link } from "react-router-dom";
import React from "react";



export default function LandingPage() {
    return (
        <div className="body_landing">

            <div className="landing">

                <Link to='/home'>
                    <h1>Henry Countries's Proyect</h1>
                </Link>
            </div>

            <h3>Welcome to Countries's API</h3>
            <p>In this page you can see different countries info with relevant information using the restcountries.com external API. Also you can create activities for each country!</p>

        </div>
    )
}