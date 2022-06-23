import SessionStorage from '../../../src/services/session-storage'

Object.defineProperty(window, 'sessionStorage', {
  value: (() => {
    let store = {};
    return {
      getItem(key) { return store[key] || null; },
      setItem(key, value) { store[key] = value.toString(); },
      removeItem(key) { delete store[key]; },
      clear() { store = {}; }
    };
  })()
});

describe('SessionStorage', () => {
  it('Should get/set', async () => {
    SessionStorage.foo = 1
    expect(SessionStorage.foo).toBe(1);
    SessionStorage.foo = undefined 
    expect(SessionStorage.foo).toBe(undefined);
  })
})