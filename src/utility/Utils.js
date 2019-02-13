/*import {
	AsyncStorage
} from 'react-native';*/

class Utils {
  constructor() {
    console.log('Utils was constructed.');
  }

  /**
   * use fetch api to fetch resources from the server
   * @param  {object} opt an object containing all the necessary parameters to execute the fetch
   * @return {[type]} does not return anything, only executes success and error callbacks
   * The callbacks can be bound with object contexts as this :
   * var x = {
   * 	name: 'John Smith'
   * };
   * var myClass = {
   *  name: 'Michael Wazowski',
   *  showName: function(){
   *  	console.log(this.name);
   *  },
   *  myMethod: function(){
   *  	var options = {
   *   		name: 'Mike Wazowski',
   *     		success: this.showName.bind(x)
   *      };
   *      Utils.fetch(options);
   *  }
   * };
   * // myClass.myMethod() on success should output 'John Smith'
   */
  fetch(opt) {
    if (typeof opt === 'undefined') {
      console.error('Utils.fetch "options" parameter is mandatory.');
      return;
    }

    if (typeof opt.url === 'undefined') {
      console.error('Utils.fetch "options.url" parameter is mandatory.');
      return;
    }

    if (typeof opt.success === 'undefined') {
      console.warn('Utils.fetch "options.success" is undefined; no callback will be executed.');
    }

    if (typeof opt.error === 'undefined') {
      console.warn('Utils.fetch "options.error" is undefined; no callback will be executed.');
    }

    let headersDefault = Object.assign(
      {
        'X-Requested-With': 'XMLHttpRequest',
      },
      opt.headers,
    );

    var reqHeaders = new Headers(headersDefault);

    let options = Object.assign(
      {
        //method: 'GET',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: reqHeaders,
      },
      opt,
    );

    console.log(options);

    if (typeof opt.method !== 'undefined' && opt.method.toLowerCase() === 'post' && typeof opt.body !== 'undefined') {
      options.body = JSON.stringify(opt.body);
    }

    fetch(options.url, options)
      .then(function(response) {
        console.log('response', response);
        return response.json();
      })
      .then(function(jsonres) {
        if (typeof options.success === 'function') options.success(jsonres);
      })
      .catch(error => {
        console.error('Fetch error', error);
        if (typeof options.error === 'function') options.error(String(error));
      });
  }

  uuidv4() {
    // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  nonce() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < possible.length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  /*async setAsyncStorage(){
		try {
			await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
		} catch (error) {
			// Error saving data
		}
	}*/
}

export default new Utils();
