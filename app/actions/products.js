import { PRODUCTS, BASE_URL, PRODUCTS_API } from '../constants';
import axios from 'axios';

// const getProducts = (page, limit, sort) => function (dispatch) {

//     axios.get(BASE_URL+PRODUCTS_API).then((response)=>{
//         console.log(response)
//     }).catch((error)=>{
//         console.log(error)
//     })

//     // return {
//     //     type: PRODUCTS,
//     //     payload: products
//     // }
// }
export function getProducts(page, limit, sort) {

    return function(dispatch, getState) {

        let prods = getState().products.products;

        console.log('prods')
        console.log(prods)

        dispatch({
            type: PRODUCTS,
            payload: [],
            loading: true,
            loadingMore: false,
            endReached: false
        })

        if(page>1){
            dispatch({
                type: PRODUCTS,
                payload: prods,
                loading: false,
                loadingMore: true,
                endReached: false
            }) 
        }

        let request = '' 
        if(sort != ''){
            // request = `${BASE_URL+PRODUCTS_API}?_sort=${sort}?_page=${page}&_limit=${limit}`
            request = `${BASE_URL+PRODUCTS_API}?_sort=${sort}`
        }else{
            request = `${BASE_URL+PRODUCTS_API}?_page=${page}&_limit=${limit}`
        }

        console.log(request)
        
        return axios.get(request).then((response)=>{
            console.log('response')
            console.log(response)
            console.log(response.data)

            if(page>1){
                let data = prods.concat(response.data)
                if(response.data.length == 0 ){
                    dispatch({
                        type: PRODUCTS,
                        payload: data,
                        loading: false,
                        loadingMore: false,
                        endReached: true
                    })  
                }else{
                    dispatch({
                        type: PRODUCTS,
                        payload: data,
                        loading: false,
                        loadingMore: false,
                        endReached: false
                    })  
                }
                
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
            console.log('error')
            console.log(error)
            dispatch({
                type: PRODUCTS,
                payload: [],
                loading: false,
                loadingMore: false
            })
        })
    };
}