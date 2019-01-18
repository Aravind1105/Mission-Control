import {
	appShowLoader,
	appHideLoader
} from '../AppActions';

import Utils from '../../utility/Utils'

/**
 * Action creator getFridges
 * @return {action}
 */
export const getFridges = () => {	
	return (dispatch) => {
		dispatch(appShowLoader());

		Utils.fetch({
			url:'https://platform-v2-dot-livello-backend.appspot.com/api/v1/fridges?listAllFridges=True',
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
		});
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


