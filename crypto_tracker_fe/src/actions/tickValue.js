import axios from 'axios'
import { store } from './store';

import { ACTION_TYPES } from "./types"
import { latest, historical } from "../fixtures/data"

const DEV_SKIP_REQUESTS = true;

const baseUrl = "http://localhost:5000/api"

const symbolSortingFn = function (a, b) {
    try {
        return a.symbol.localeCompare(b.symbol);
    } catch {
        return 0;
    }
}

export const fetchLatest = () => dispatch => {
    if (DEV_SKIP_REQUESTS) {
        return dispatch({
            type: ACTION_TYPES.FETCH_LATEST,
            payload: latest.sort(symbolSortingFn)
        })
    }
    axios.get(`${baseUrl}/Ticks`)
        .then(response =>
            dispatch({
                type: ACTION_TYPES.FETCH_LATEST,
                payload: response.data.sort(symbolSortingFn)
            }))
        .catch(e => console.log(e))
}

export const fetchHistorical = () => dispatch => {
    if (DEV_SKIP_REQUESTS) {
        return dispatch({
            type: ACTION_TYPES.FETCH_HISTORICAL,
            payload: historical
        })
    }

    const hoursBack = store.getState().tickValue.historicalHoursBack
    axios.get(`${baseUrl}/History?hoursBack=${hoursBack}`)
        .then(response =>
            dispatch({
                type: ACTION_TYPES.FETCH_HISTORICAL,
                payload: response.data
            }))
        .catch(e => console.log(e))
}


export const updateInterval = (hours) => dispatch => {
    // TODO validate range here?
    dispatch({
        type: ACTION_TYPES.UPDATE_INTERVAL,
        payload: hours
    })
}