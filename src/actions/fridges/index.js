
export const addFridge = (id, address, status, serialNo, lastModified ) => ({
   type: "ADD_Fridge",
   id: id++,
   address: address ? address : "",
   status: status ? status : "",
   serialNo: serialNo ? serialNo : "",    
   lastModified: lastModified ? lastModified : "",    
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


