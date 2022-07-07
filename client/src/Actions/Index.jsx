const axios = require('axios');

export function getAllCountries() {
    return async function (dispatch) {
        let response = await axios(`/countries`)
        dispatch({
            type: "GET_ALL_COUNTRIES",
            payload: response.data
        })
    }
}

export function getAllActivities() {
    return async function (dispatch) {
        let response = await axios('/activities')
        dispatch({
            type: 'GET_ALL_ACTIVITIES',
            payload: response.data
        })
    }
}

export function getCountryById(id) {
    return async function (dispatch) {
        let response = await axios(`/countries/${id}`)
        dispatch({
            type: 'GET_COUNTRY_BY_ID',
            payload: response.data
        })
    }
}

export function getCountriesByName(name) {
    return async function (dispatch) {
        let response = await axios(`/countries?name=${name}`)
        dispatch({
            type: 'GET_COUNTRIES_BY_NAME',
            payload: response.data
        })
    }
}

export function orderByName(order) {
    return async function (dispatch) {
        let response = await axios(`/nameOrder?order=${order}`)
        dispatch({
            type: 'ORDER_BY_NAME',
            payload: response.data
        })
    }
}

export function orderByPopulation(order) {
    return async function (dispatch) {
        let response = await axios(`/populationOrder?order=${order}`)
        dispatch({
            type: 'ORDER_BY_POPULATION',
            payload: response.data
        })
    }
}

export function postActivity(payload) {
    return function () {
        axios.post(`/activities`, payload)
    }
}

export function getCountriesByActivity(activityID) {
    return async function (dispatch) {
        let response = await axios(`/activities?id=${activityID}`)
        dispatch({
            type: 'GET_COUNTRIES_BY_ACTIVITY',
            payload: response.data
        })
    }
}

export function getCountriesByContinents(continent) {
    return async function (dispatch) {
        let response = await axios(`/continentFilter?continent=${continent}`)
        dispatch({
            type: 'GET_COUNTRIES_BY_CONTINENT',
            payload: response.data
        })
    }
}