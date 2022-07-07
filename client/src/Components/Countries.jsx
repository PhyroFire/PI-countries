import React from "react"
import Card from "../Components/Card"
import Loading from '../CSS/Imagenes/Loading2.gif'
import NotFound from '../CSS/Imagenes/Not_Found.gif'
import { getAllCountries } from "../Actions/Index";
import { useDispatch } from "react-redux";

export default function Countries({ currentCountries }) {

    const dispatch = useDispatch()
    function handleButton(event) {
        event.preventDefault()
        dispatch(getAllCountries())
    }

    return (
        <div className="Cards">
            {
                currentCountries.length > 0 ?

                    typeof currentCountries === "object" ?

                        currentCountries.map(country => {
                            return (
                                <div key={country.id} >
                                    <Card name={country.name} id={country.id} img={country.img} continent={country.continent} />
                                </div>
                            )
                        })
                        :
                        <button onClick={event => handleButton(event)}>
                            <img id="notFound" src={NotFound} alt="Not Found" />
                        </button>
                    :
                    <div>
                        <h5>Loading...</h5>
                        <img src={Loading} alt="Cargando" />
                    </div>
            }
        </div>
    )
}