import {
	appShowLoader,
	appHideLoader
} from './appActions';

import Utils from '../utility/Utils'

/**
 * Action creator getOrganizations
 * @return {action}
 */
export const getOrganizations = () => {
	return (dispatch) => {
		dispatch(appShowLoader());

		Utils.fetch({
			url:'https://platform-v2-dot-livello-backend.appspot.com/api/v1/organisations',
			headers: {
        		"Authorization": "Bearer " + localStorage.getItem('access_token')
			},
			success: (result) => {
				console.info('Success------------------------------> GetOrganizations',result);
				dispatch(setOrganizations(result.items));
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

export const setOrganizations = (payload) => {
	return {
		type: 'SET_ORGANIZATIONS',
		payload
	}
};

export const addOrganization = (name, id, address, status, serialNo ) => ({
   type: "ADD_ORGANIZATION",
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





