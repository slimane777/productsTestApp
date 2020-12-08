import { PRODUCTS } from '../constants';

// initial state
const initialState = {
    products: [],
    loading: true,
    loadingMore: false,
    endReached: false
};

// update state
const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: action.loading,
                loadingMore: action.loadingMore,
                endReached: action.endReached,
            };
        default:
            return state;
    }
}
export default productsReducer;