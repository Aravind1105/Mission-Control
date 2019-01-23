import {
	appShowLoader,
	appHideLoader
} from '../AppActions';

import Utils from '../../utility/Utils'
import LivelloApi from 'livello-api-js'

/**
 * Action creator getFridges
 * @return {action}
 */
export const getFridges = () => {		

	return (dispatch) => { 
		dispatch(appShowLoader());
		window.api = new LivelloApi(localStorage.getItem('access_token'));
		window.api.fridges.getProducts('5c0cfea352faff0001a8ac61')
		.then((result)=>{
			console.log('call to the API...........', result);
			/*
			var errObj = ErrorFilter.Check4StripeError(result);
			console.info('-----------> fridgesGetProducts ErrorFilter',errObj);

			if(errObj.hasError){
				console.log('call to the API error.............', result.body.items)
				// add inline error to screen
				dispatch(ErrorInlineAdd(errObj));
			}else{
				dispatch(fridgesSetProducts(result.body.items));
			}
			dispatch(appHideLoader()); */
		})
		.catch((error) => {
			console.log('error.....', error)
			// add inline error to screen
			//dispatch(ErrorInlineAdd(result));
			//dispatch(appHideLoader());
		}); 

		/*Utils.fetch({
			url:'https://platform-v2-dot-livello-backend.appspot.com/api/v1/fridges?listAllFridges=True',
			method: 'GET',
			headers: {							
        		"Authorization": "Bearer " + localStorage.getItem('access_token')
			},			
			success: (result) => {
				console.info('Success------------------------------> GetFridges',result);
				dispatch(setFridges(result.items));
				dispatch(appHideLoader());
			},
			error: (error) => {
				console.error('error in home api call',error);
				console.info('=====================================');
				console.info(error);
				console.info('=====================================');

				dispatch(appHideLoader());
			}
		}); */
	} 
};

export const setFridges = (payload) => {
	return {
		type: 'SET_FRIDGES',
		payload
	}
};

export const addFridge = (name, id, address, status, serialNo ) => ({
   type: "ADD_Fridge",   
   name: name ? name : "",
   id: id++,
   address: address ? address : "",
   status: status ? status : "",
   serialNo: serialNo ? serialNo : ""   
});

export const updateFridge = (id, field, value) => ({
   type: "UPDATE_FRIDGE",
   id: id,
   field: field,
   value: value
});

export const fridgeDetails = id => ({
   type: "FRIDGE_DETAILS",
   id
});

export const setEditFridgeFlag = flag => ({
   type: "EDIT_FRIDGE",
   flag
});


export const fridgesSearch = searchTerm => ({
   type: "FILTER_FRIDGE",
   payload: searchTerm
});

export const deleteFridge = id => ({
   type: "DELETE_FRIDGE",
   id
});


