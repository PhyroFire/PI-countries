import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { orderByName, postActivity } from "../Actions/Index";

export default function CreateGame() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allCountries = useSelector(state => state.countries)

    const [input, setImput] = useState({
        name: "",
        dificulty: 0,
        duration: 0,
        season: "",
        countries: [],
    })

    useEffect(() => {
        dispatch(orderByName("Ascendente"))
    }, [])

    function handleInput(event) {
        event.preventDefault()
        setImput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSelectSeason(event) {
        event.preventDefault()
        if (event.target.value !== "Season") {
            setImput({
                ...input,
                season: event.target.value
            })
        }
    }

    function handleSelectCountry(event) {
        event.preventDefault()
        if (event.target.value !== "Country") {
            let valorFiltrado = input.countries.find(pais => pais=== event.target.value)
            if (!valorFiltrado) {
                setImput({
                    ...input,
                    countries: [...input.countries, event.target.value]
                })
            }
        }
    }

    function handleRemoveCountry(event) {
        event.preventDefault()
        let arrayFiltrado = input.countries.filter(pais => pais !== event.target.value)
        setImput({
            ...input,
            countries: arrayFiltrado
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (input.name === "" || input.dificulty === "" || input.duration === 0 || input.season === "" || input.countries === []) {
            return alert("You must complete all forms to create a activity")
        }
        dispatch(postActivity(input))
        alert("Activity created!")
        setImput({
            name: "",
            dificulty: 0,
            duration: 0,
            season: "",
            countries: [],
        })
        navigate("/home");
    }

    return (
        <div className="CreateActivity">

            <Link to='/home'><button id="backToHome">Back to Home!</button></Link>

            <h1>Create your own activity !</h1>
            <form onSubmit={(event) => handleSubmit(event)} className="Form">

                <div className="Label">
                    <label>Name</label>
                    <input
                        type='text'
                        size="40"
                        value={input.name}
                        name='name'
                        placeholder="Your activity name..."
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div className="Label">
                    <label>Dificulty</label>
                    <input
                        type='number'
                        value={input.dificulty}
                        name='dificulty'
                        min="1" max="5"
                        placeholder=" Dificulty of the activity"
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div className="Label">
                    <label>Duration</label>
                    <input
                        type='number'
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
                                    <option value={pais.name}>{pais.name}</option>
                                )
                            })
                        }
                    </select>
                    <ul>{input.countries.map(pais => { return (<li>{pais}<button value={pais} onClick={(event) => handleRemoveCountry(event)}>X</button></li>) })}</ul>
                </div>

                <button id="submit" type="submit">Create Activity</button>
            </form>
        </div>
    )
}