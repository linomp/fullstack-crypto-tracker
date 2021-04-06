import { ACTION_TYPES } from "../actions/types"

const initialState = {
    latest: [],
    historical: {},
    historicalHoursBack: 6
}

export const tickValue = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_LATEST:
            return { ...state, latest: [...action.payload] }

        case ACTION_TYPES.FETCH_HISTORICAL:
            return { ...state, historical: action.payload }

        case ACTION_TYPES.UPDATE_INTERVAL:
            return { ...state, historicalHoursBack: action.payload }

        default:
            return state

    }
}