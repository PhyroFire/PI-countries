const initialState = {
    countries: [],
    country: [],
    activities: [],
}

export default function rootReducer(state = initialState, action) {


    switch (action.type) {
        case 'GET_ALL_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
            }
        case 'GET_ALL_ACTIVITIES':
            return {
                ...state,
                activities: action.payload
            }

        case 'GET_COUNTRY_BY_ID':
            return {
                ...state,
                country: action.payload
            }
        case 'GET_COUNTRIES_BY_NAME':
            return {
                ...state,
                countries: action.payload
            }
        case 'ORDER_BY_NAME':
            return {
                ...state,
                countries: action.payload
            }
        case 'ORDER_BY_POPULATION':
            return {
                ...state,
                countries: action.payload
            }
        case 'GET_COUNTRIES_BY_ACTIVITY':
            return {
                ...state,
                countries: action.payload
            }
        case 'GET_COUNTRIES_BY_CONTINENT':
            return {
                ...state,
                countries: action.payload
            }
        default: return state
    }
}