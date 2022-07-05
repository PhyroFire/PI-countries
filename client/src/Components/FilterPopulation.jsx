import React from "react";
import { useDispatch } from "react-redux";
import { orderByPopulation } from "../Actions/Index";

export default function FilterPopulation({pages}) {

    const dispatch = useDispatch()
    function handleOrderByPopulation(event) {
        event.preventDefault()
        dispatch(orderByPopulation(event.target.value))
        pages(1)
    }

    return (
        <div>
            <select onChange={event => handleOrderByPopulation(event)}>
                <option>Order by Population</option>
                <option value='Mayor'>Population +</option>
                <option value='Menor'>Population -</option>
            </select>
        </div>
    )
}
