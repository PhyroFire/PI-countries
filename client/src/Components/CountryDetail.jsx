import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryById } from "../Actions/Index";
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Detail() {


    const dispatch = useDispatch()
    const country = useSelector(state => state.country)
    const { id } = useParams() // usa el parametro de la URL

    useEffect(() => {
        dispatch(getCountryById(id))
    }, [])

    return (
        <div className="CountryDetail">

            <h1>{country.name}</h1>
            <img src={country.img} alt={country.name} />

            <p>Country ID: {country.id}</p>

            <p>Continent: {country.continent}</p>
            
            <p>Subregion: {country.subregion}</p>
            
            <p>Capital: {country.capital}</p>
            
            <p>Area: {country.area}</p>
            
            <p>Population: {country.population}</p>

            <Link to='/home'><button id="backToHome">Back to Home</button></Link>

        </div>
    )
}