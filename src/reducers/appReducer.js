import initialState from './initialState';
import * as actions from '../actionTypes';

const reducer = (state = initialState.app, action) => {
    switch (action.type) {

        case actions.LOADING_OPERATION: {
            return {
                ...state,
                loading: action.payload
            }
        }

        case actions.FETCH_COMM_DATA: {
            return {
                ...state,
                communications: action.payload.postlist
            }
        }

        case actions.FETCH_COMM_DETAIL_DATA: {
            return {
                ...state,
                communication: action.payload.postlist[0]
            }
        }

        
    }
}

export default reducer;