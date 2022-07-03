import React from "react";
import { useDispatch } from "react-redux";
import { orderByPopulation } from "../Actions/Index";

export default function FilterPopulation() {

    const dispatch = useDispatch()
    function handleOrderByPopulation(event) {
        dispatch(orderByPopulation(event.target.value))
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
