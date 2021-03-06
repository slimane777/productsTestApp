import { createStore, combineReducers, applyMiddleware } from 'redux';
import productsReducer from '../reducers/productsReducer';
import thunk from "redux-thunk";
// redux store configuration
const rootReducer = combineReducers({ products: productsReducer });

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;