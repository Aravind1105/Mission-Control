import {
	appShowLoader,
	appHideLoader
} from '../AppActions';

import Utils from '../../utility/Utils'

/**
 * Action creator fridgesGetProducts
 * @return {action}
 */
export const getProducts = () => {
	return (dispatch) => {
		dispatch(appShowLoader());

		Utils.fetch({
			url:'/api/v1/fridges/7/products',
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				//"Access-Control-Allow-Origin": "http://localhost:3000"
			},			
			success: (result) => {
				console.info('Success------------------------------> GetProducts',result);
				dispatch(setProducts(result.items));
				dispatch(appHideLoader());
			},
			error: (error) => {
				console.error('error in home api call',error);
				console.info('=====================================');
				console.info(error);
				console.info('=====================================');

				dispatch(appHideLoader());
			}
		});
	}
};

export const setProducts = (payload) => {
	return {
		type: 'SET_PRODUCTS',
		payload
	}
};

export const addProduct = (id, name, price, quantity) => ({
   type: "ADD_PRODUCT",
   id: id++,
   name: name ? name : "",
   image: "../../assets/img/photos/2880x1800-light-sea-green-solid-color-background.jpg",
   price: price ? price : "",
   quantity: quantity ? quantity : ""   
});

export const updateProduct = (id, field, value) => ({
   type: "UPDATE_PRODUCT",
   id: id,
   field: field,
   value: value
});

export const productDetails = id => ({
   type: "PRODUCT_DETAILS",
   id
});

export const setEditProductFlag = flag => ({
   type: "EDIT_PRODUCT",
   flag
});


export const productsSearch = searchTerm => ({
   type: "FILTER_PRODUCT",
   payload: searchTerm
});

export const deleteProduct = id => ({
   type: "DELETE_PRODUCT",
   id
});


