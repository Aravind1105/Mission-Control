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
	console.log('tocken from storage........', localStorage.getItem('access_token'))
	return (dispatch) => {
		dispatch(appShowLoader());

		Utils.fetch({
			url:'https://platform-v2-dot-livello-backend.appspot.com/api/v1/products/line',
			headers: {							
        		"Authorization": "Bearer " + localStorage.getItem('access_token')
			},			
			success: (result) => {
				console.info('Success------------------------------> GetProducts',result);
				dispatch(setProducts(result));
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

export const addProduct = (id, name, description, price, individualWeight, packagingWeight) => ({
   type: "ADD_PRODUCT",
   id: id++,
	name: name ? name : "",
	description: description ? description : "",
	active: true,
   image: "../../assets/img/photos/2880x1800-light-sea-green-solid-color-background.jpg",
   price: price ? price : "",
	individualWeight: individualWeight ? individualWeight : "",
	packagingWeight: packagingWeight ? packagingWeight : ""
	   
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

