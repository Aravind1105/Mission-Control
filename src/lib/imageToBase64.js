const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    callback(reader.result);
  };
  reader.onerror = function(error) {
    console.log('Error: ', error);
  };
};

export default getBase64;
