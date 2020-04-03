import initialState from './initialState';
import appReducer from './appReducer';

const reducer = (state = initialState, action) => {
    return {
        app: appReducer(state.app, action),
    }
}

export default reducer;