/**
 * GLOBAL CONFIG
 */
import Config from './Config';

const Utils = {
  isEmpty: x => {
    if (x === null || typeof x === 'undefined' || x === '') {
      return true;
    } else {
      return false;
    }
  },
  notEmpty: x => {
    if (x !== null && typeof x !== 'undefined' && x !== '') {
      return true;
    } else {
      return false;
    }
  },
  setLanguage: nl => {
    // cookies
    var l = window.Cookies.get('l');
    if (typeof nl !== 'undefined') {
      nl = nl.toLowerCase();
      window.Cookies.set('l', nl);
    } else if (typeof l === 'undefined') {
      window.Cookies.set('l', 'en-US');
    }
  },
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
  fetch: opt => {
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

    let options = Object.assign(
      {
        method: 'GET',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
      opt,
    );

    if (typeof opt.method !== 'undefined' && opt.method.toLowerCase() === 'post' && typeof opt.body !== 'undefined') {
      options.body = JSON.stringify(opt.body);
    }

    fetch(options.url, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonres) {
        if (typeof options.success === 'function') options.success(jsonres);
      })
      .catch(error => {
        console.error('Fetch error', error);
        if (typeof options.error === 'function') options.error(String(error));
      });
  },
  flattenMessages: (nestedMessages, prefix = '') => {
    return Object.keys(nestedMessages).reduce((messages, key) => {
      let value = nestedMessages[key];
      let prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, Utils.flattenMessages(value, prefixedKey));
      }

      return messages;
    }, {});
  },
  loadLanguage: (languageToLoad, successCallback, errorCallback) => {
    // the language files can have a normal json structure, but
    // react-intl plugin requires json to be flatten, so we need to
    // pass the structured json through the Utils.flattenMessages method
    Utils.fetch({
      url: Config[window.ENV].i18nPath + languageToLoad + '.json',
      success: nestedMessages => {
        successCallback(languageToLoad, Utils.flattenMessages(nestedMessages));
      },
      error: errorCallback,
    });
  },
  activateLanguage: (lang, activateLanguageSuccess) => {
    Utils.loadLanguage(lang, activateLanguageSuccess, res => {
      console.error(res);
      Utils.loadLanguage(Config[window.ENV].i18nDefaultLanguage, activateLanguageSuccess, res => {
        console.error('Unable to load default language.');
      });
    });
  },
  detectLanguage: callback => {
    // TEST SOME OTHER LANGUAGE
    // callback('pt');
    // return;

    window.defaultLanguage = Config[window.ENV].i18nDefaultLanguage;

    window.l = window.Cookies.getItem('Language');

    if (!window.l || typeof window.l === 'undefined') {
      window.l =
        typeof navigator === 'undefined'
          ? window.defaultLanguage
          : (
              (navigator.languages && navigator.languages[0]) ||
              navigator.language ||
              navigator.userLanguage ||
              window.defaultLanguage
            ).toLowerCase();

      window.l = window.l.substr(0, 2);

      window.Cookies.setItem('Language', window.l, 86400);
    } else if (window.l && window.l.length === 2) {
      window.Cookies.setItem('Language', window.l, 86400);
    }
    console.info('---------> Detected language: ', window.l);
    callback('pt'); //window.l);
  },
  /**
   * DEPRECATED in favor of _.get (lodash get)
   * tries to find a nested property inside an object and returns it if found or false if not found.
   * i.e. get_if_exist(test,'level1.level2.level3');
   * @param  {[type]} obj          object in which to search for the nested property
   * @param  {[type]} propertyPath path to the nested property
   * @return {[type]}              the property value or false
   */
  getIfExists: (obj, propertyPath) => {
    if (!propertyPath) return false;

    var properties = propertyPath.split('.');

    for (var i = 0; i < properties.length; i++) {
      var prop = properties[i];

      if (!obj || !obj.hasOwnProperty(prop)) {
        console.info('obj doesnt have', prop);
        return false;
      } else {
        obj = obj[prop];
      }
    }

    return obj;
  },
  /**
   * validates a string received against a regular expression to verify it's a valid e-mail
   * @param  {String} email string containing the e-mail to validate
   * @return {bool} the reslt of the regex evaluation
   */
  validateEmail: (email = '') => {
    return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
  },
  validatePassword: (pwd = '') => {
    var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    var mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    );
    let ret = false;
    if (strongRegex.test(pwd)) {
      ret = 2;
    } else if (mediumRegex.test(pwd)) {
      ret = 1;
    }
    return ret;
  },
  getHashParams() {
    var hashParams = {};
    var e,
      a = /\+/g, // Regex for replacing addition symbol with a space
      r = /([^&;=]+)=?([^&;]*)/g,
      d = function(s) {
        return decodeURIComponent(s.replace(a, ' '));
      },
      q = window.location.hash.substring(1);

    while ((e = r.exec(q))) hashParams[d(e[1])] = d(e[2]);

    return hashParams;
  },
};
export default Utils;
