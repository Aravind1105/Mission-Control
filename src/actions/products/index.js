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


