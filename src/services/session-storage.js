// Provides a HashMap-like interface to sessionStorage. e.g.,
// SessionStorage.foo = 1;
// SessionStorage.foo = 2;

const encrypt = val => window.btoa(val);
const decrypt = val => window.atob(val);
const SessionStorage = new Proxy({}, {
  get(obj, prop) {
    const strValue = window.sessionStorage.getItem(`${encrypt(prop)}`);
    return strValue ? JSON.parse(decrypt(strValue)) : undefined;
  },
  set(obj, prop, value)  {
    if (value === undefined) {
      window.sessionStorage.removeItem(`${encrypt(prop)}`);
      return true;
    } else {
      const strValue = JSON.stringify(value);
      window.sessionStorage.setItem(`${encrypt(prop)}`, encrypt(strValue));
      return true;
    }
  },
});

export default SessionStorage;