let ls = null;
try {
  ls = window.localStorage;
  console.log('ls: ', ls)
} catch (error) {
  ls = null;
}

export default class LivelloLS {
  static setItem(key, data) {
    try {
      ls.setItem(key, data);
      return true;
    } catch (e) {
      // iPad workaround
      if (this.removeItem(key)) {
        try {
          ls.setItem(key, data);
          return true;
        } catch (error) {
          return false;
        }
      }
    }
    // throw exceptions frequently
    return false;
  }

  static getItem(key) {
    try {
      return ls.getItem(key);
    } catch (error) {
      return null;
    }
    // throw exceptions frequently
  }

  static clear() {
    try {
      ls.clear();
      return true;
    } catch (error) {
      return false;
    }
    // throw exceptions frequently
  }

  static removeItem(key) {
    try {
      ls.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
    // throw exceptions frequently
  }

  static length() {
    try {
      return ls.length;
    } catch (error) {
      return 0;
    }
    // throw exceptions rarely
  }

  static key(index) {
    try {
      return ls.key(index);
    } catch (error) {
      return '';
    }
    // throw exceptions rarely
  }
}
