import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryById, deleteActivityFromCountry } from "../Actions/Index";
import React from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate  } from "react-router-dom";
import "../CSS/CountryDetail.css"

export default function Detail() {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const country = useSelector(state => state.country)
    const { id } = useParams() // usa el parametro de la URL

    useEffect(() => {
        dispatch(getCountryById(id))
    }, [])

    function handleDelete(event){

        event.preventDefault()
        let data = {
            countryId : country.id,
            activityId : event.target.value
        }

        dispatch(deleteActivityFromCountry(data))
        navigate("/home");
    }

    return (
        <div className="CountryDetail">

            <div id="CountryDetailData">
                <h1>{country.name}</h1>
                <img src={country.img} alt={country.name} />

                <p>Country ID: {country.id}</p>

                <p>Continent: {country.continent}</p>

                <p>Subregion: {country.subregion}</p>

                <p>Capital: {country.capital}</p>

                <p>Area: {country.area}</p>

                <p>Population: {country.population}</p>
            </div>

            <div id="MainActivity">
                {
                    typeof country.turisms === "object" ?

                        country.turisms.length > 0 ?
                            <h4>Activities</h4>
                            :
                            <></>
                        :
                        <></>
                }
                <div id="ActivitiesBox">
                    {
                        country.turisms && country.turisms.map(act =>
                            <div key={act.id} id="Activities">
                                <p>Id: {act.id}</p>
                                <p>Name: {act.name}</p>
                                <p>Dificulty: {act.dificulty}</p>
                                <p>Duration: {act.duration} Hours</p>
                                <p>Season: {act.season}</p>

                                <button value={act.id} onClick={(event)=>{if(window.confirm("Delete activity?"))handleDelete(event)}}>Delete Activity</button>
                            </div>
                        )
                    }
                </div>
            </div>

            <Link to='/home'><button id="backToHome">Back to Home</button></Link>
        </div>
    )
}