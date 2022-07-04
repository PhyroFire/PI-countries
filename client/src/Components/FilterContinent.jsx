import React from "react";
import { useDispatch } from "react-redux";
import { getAllCountries, getCountriesByContinents } from "../Actions/Index";

export default function FilterContinent() {

    const dispatch = useDispatch()
    const continents = ['Oceania', 'Asia', 'Africa', 'Europe', 'South America', 'North America', 'Antarctica']

    function handleContinentFilter(event) {
        if (event.target.value !== "All") {
            dispatch(getCountriesByContinents(event.target.value))
        }
        else {
            dispatch(getAllCountries())
        }
    }

    return (
        <div>
            <select onChange={event => handleContinentFilter(event)}>
                <option value='All'>Countries by Continents</option>
                <option value='All'>All</option>
                {
                    continents.map(cont => {
                        return (
                            <option key={cont} value={cont}>{cont}</option>
                        )
                    })
                }
            </select>
        </div>
    )

}