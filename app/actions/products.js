import { PRODUCTS, BASE_URL, PRODUCTS_API } from '../constants';
import axios from 'axios';

export function getProducts(page, limit, sort) {

    return function(dispatch, getState) {

        // getting previously stored products
        let prods = getState().products.products;

        // restore state
        dispatch({
            type: PRODUCTS,
            payload: [],
            loading: true,
            loadingMore: false,
            endReached: false
        })

        // keeping previously stored data when loading more
        if(page>1){
            dispatch({
                type: PRODUCTS,
                payload: prods,
                loading: false,
                loadingMore: true,
                endReached: false
            }) 
        }

        // preparing the api
        let request = '' 
        if(sort != ''){
            request = `${BASE_URL+PRODUCTS_API}?_sort=${sort}`
        }else{
            request = `${BASE_URL+PRODUCTS_API}?_page=${page}&_limit=${limit}`
        }

        // making axios call to get data from the api
        return axios.get(request).then((response)=>{

            // concatinating data if loading more
            if(page>1){
                let data = prods.concat(response.data)
                // sending end reached to show end of catalogue message
                if(response.data.length == 0 ){
                    dispatch({
                        type: PRODUCTS,
                        payload: data,
                        loading: false,
                        loadingMore: false,
                        endReached: true
                    })  
                // keep loading data
                }else{
                    dispatch({
                        type: PRODUCTS,
                        payload: data,
                        loading: false,
                        loadingMore: false,
                        endReached: false
                    })  
                }
            // storing data 
            }else{
                dispatch({
                    type: PRODUCTS,
                    payload: response.data,
                    loading: false,
                    loadingMore: false,
                    endReached: false
                })
            }

        }).catch((error)=>{
            dispatch({
                type: PRODUCTS,
                payload: [],
                loading: false,
                loadingMore: false
            })
        })
    };
}