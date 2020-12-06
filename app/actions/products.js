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
    return function(dispatch) {
        console.log(BASE_URL+PRODUCTS_API)
        let request = '' 
        if(sort){
            request = `${BASE_URL+PRODUCTS_API}?_sort=${sort}?_page=${page}&_limit=${limit}`
        }else{
            request = `${BASE_URL+PRODUCTS_API}?_page=${page}&_limit=${limit}`
        }
        
        return axios.get(request).then((response)=>{
            console.log('response')
            console.log(response)
            console.log(response.data)
            dispatch({
                type: PRODUCTS,
                payload: response.data
            })
        }).catch((error)=>{
            console.log('error')
            console.log(error)
        })
    };
}