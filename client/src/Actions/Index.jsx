const axios = require('axios');

export function getAllCountries() {
    return function (dispatch) {
        fetch('http://localhost:3001/countries')
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'GET_ALL_COUNTRIES',
                payload: resToJson
            }))
    }
}

export function getAllActivities() {
    return function (dispatch) {
        fetch('http://localhost:3001/activities')
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'GET_ALL_ACTIVITIES',
                payload: resToJson
            }))
    }
}

export function getCountryById(id) {
    return function (dispatch) {
        fetch(`http://localhost:3001/countries/${id}`)
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'GET_COUNTRY_BY_ID',
                payload: resToJson
            }))
    }
}

export function getCountriesByName(name) {
    return function (dispatch) {
        try {
            fetch(`http://localhost:3001/countries?name=${name}`)
                .then(res => res.json())
                .then(resToJson => dispatch({
                    type: 'GET_COUNTRIES_BY_NAME',
                    payload: resToJson
                }))
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderByName(order) {
    return function (dispatch) {

        fetch(`http://localhost:3001/nameOrder?order=${order}`)
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'ORDER_BY_NAME',
                payload: resToJson
            }))
    }
}

export function orderByPopulation(order) {
    return function (dispatch) {
        fetch(`http://localhost:3001/populationOrder?order=${order}`)
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'ORDER_BY_POPULATION',
                payload: resToJson
            }))
    }
}

export function postActivity(payload) {
    return async function () {
        await axios.post(`http://localhost:3001/activities`, payload)
    }
}

export function getCountriesByActivity(activityID) {
    return function (dispatch) {
        fetch(`http://localhost:3001/activities?id=${activityID}`)
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'GET_COUNTRIES_BY_ACTIVITY',
                payload: resToJson
            }))
    }
}

export function getCountriesByContinents(continent) {
    return function (dispatch) {
        fetch(`http://localhost:3001/continentFilter?continent=${continent}`)
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'GET_COUNTRIES_BY_CONTINENT',
                payload: resToJson
            }))
    }
}