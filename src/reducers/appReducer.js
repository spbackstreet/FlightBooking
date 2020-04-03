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

        case actions.STORE_CUSTOMER_CIRCLE: {
            return {
                ...state,
                pincode: action.payload.postlist
            }
        }

        

        
    }
}

export default reducer;