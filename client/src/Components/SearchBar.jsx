import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getCountriesByName } from "../Actions/Index";


export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInput(event) {
        setName(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(getCountriesByName(name))
        setName("")
    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <input
                    value={name}
                    type='text'
                    placeholder="Search country..."
                    onChange={(event) => handleInput(event)}
                />
                <button type="submit" >Search</button>
            </form>
        </div>
    )

}