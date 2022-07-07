import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { orderByName, postActivity } from "../Actions/Index";
import "../CSS/CreateActivity.css"

export default function CreateActivity() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allCountries = useSelector(state => state.countries)
    const dificulty = [1, 2, 3, 4, 5]

    const [input, setInput] = useState({
        name: "",
        dificulty: null,
        duration: "",
        season: "",
        countries: [],
    })

    useEffect(() => {
        dispatch(orderByName("Ascendente"))
    }, [])

    function handleRadio(event) {

        let currentRadio = document.getElementById(event.target.id);

        if (event.target.id === input.dificulty) {
            currentRadio.checked = false
            setInput({
                ...input,
                "dificulty": null
            })
        }
        else {
            setInput({
                ...input,
                "dificulty": event.target.value
            })
        }
    }

    function handleInput(event) {
        event.preventDefault()
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSelectSeason(event) {
        event.preventDefault()
        if (event.target.value !== "Season") {
            setInput({
                ...input,
                season: event.target.value
            })
        }
        else {
            setInput({
                ...input,
                season: ""
            })
        }
    }

    function handleSelectCountry(event) {
        event.preventDefault()
        if (event.target.value !== "Country") {
            let valorFiltrado = input.countries.find(pais => pais === event.target.value)
            if (!valorFiltrado) {
                setInput({
                    ...input,
                    countries: [...input.countries, event.target.value]
                })
            }
        }
    }

    function handleRemoveCountry(event) {
        event.preventDefault()
        let arrayFiltrado = input.countries.filter(pais => pais !== event.target.value)
        setInput({
            ...input,
            countries: arrayFiltrado
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (input.name === "") {
            return alert("Activity NAME required")
        }
        else if (input.dificulty === null) {
            return alert("Activity DIFICULTY required")
        }
        else if (input.duration === "") {
            return alert("Activity DURATION required")
        }
        else if (input.season === "") {
            return alert("Activity SEASON required")
        }
        else if (input.countries === []) {
            return alert("Activities should be assigned to COUNTRIES")
        }
        dispatch(postActivity(input))
        alert("Activity created!")
        setInput({
            name: "",
            dificulty: null,
            duration: "",
            season: "",
            countries: [],
        })
        navigate("/home");
    }

    return (
        <div className="CreateActivity">
            <h1>Create your own activity !</h1>
            <form onSubmit={(event) => handleSubmit(event)} className="Form">

                <div className="Label">
                    <label>Name</label>
                    <input
                        className="CreateInput"
                        type='text'
                        size="40"
                        value={input.name}
                        name='name'
                        placeholder="Your activity name..."
                        onChange={(event) => handleInput(event)}
                    />
                    {
                        input.name ?         
                                <p></p>             
                            :            
                                <p>"Debe ingresar un name"</p>

                    }

                </div>
                <div className="Label">
                    <label>Dificulty</label>
                    <div id="Dificulty">
                        {
                            dificulty.map(number => {
                                return (
                                    <div key={number}>
                                        <input type="radio" value={number} onClick={(event) => handleRadio(event)} id={`${number}`} name="dificulty" />
                                        <label htmlFor={`${number}`}> {number} </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="Label">
                    <label>Duration</label>
                    <input
                        type='time'
                        value={input.duration}
                        name='duration'
                        onChange={(event) => handleInput(event)}
                    />
                </div>

                <div className="Select">
                    <select onChange={(event) => handleSelectSeason(event)}>
                        <option>Season</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                    </select>
                </div>

                <div className="Select">

                    <select onChange={(event) => handleSelectCountry(event)}>
                        <option>Country</option>
                        {
                            allCountries && allCountries.map(pais => {
                                return (
                                    <option key={pais.id} value={pais.name}>{pais.name}</option>
                                )
                            })
                        }
                    </select>
                    <ul>
                        {
                            input.countries.map(pais => {
                                return (
                                    <li key={pais}>{pais}<button value={pais} onClick={(event) => handleRemoveCountry(event)}>X</button></li>
                                )
                            })
                        }
                    </ul>
                </div>

                <button id="submit" type="submit">Create Activity</button>
            </form>
            <Link to='/home'><button id="backToHome">Back to Home!</button></Link>
        </div>
    )
}