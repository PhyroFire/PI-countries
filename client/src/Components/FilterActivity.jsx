import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountriesByActivity, getAllActivities } from "../Actions/Index";

export default function FilterActivity() {

    const dispatch = useDispatch()
    const allActivities = useSelector(state => state.activities)

    useEffect(() => {
        dispatch(getAllActivities())
    }, [])

    function handleGenreFilter(event) {
        dispatch(getCountriesByActivity(event.target.value))
    }

    return (
        <div>
            <select onChange={event => handleGenreFilter(event)}>
                <option value='All'>Filter by Activity</option>
                <option value='All'>All</option>
                {
                    allActivities && allActivities.map(act => {
                        return (
                            <option value={act.id}>{act.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )

}