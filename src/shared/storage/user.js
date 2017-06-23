import { isObject } from 'lodash';

const USER_STORAGE_KEY = 'user';
const CURRENT_STORE_KEY = 'current_store';

function setUser(user) {
  if (!isObject(user)) {
    throw new TypeError('user should be an object');
  }
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  return Promise.resolve(user);
}

function removeUser() {
  window.localStorage.removeItem(USER_STORAGE_KEY);

  return Promise.resolve(null);
}

function getUserSync() {
  const user = JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY));

  return user;
}

function getUser() {
  const user = getUserSync();

  return user ? Promise.resolve(user) : Promise.reject();
}

function setCurrentStore(store) {
  window.localStorage.setItem(CURRENT_STORE_KEY, JSON.stringify(store));
  return Promise.resolve(store);
}

function getCurrentStore() {
  const store = window.localStorage.getItem(CURRENT_STORE_KEY);
  return Promise.resolve(JSON.parse(store));
}

function getToken() {
  // TODO: Put token to another storage item so we don't call JSON.parse every time
  const user = JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY));
  return user ? user.token : undefined;
}

export default {
  setUser,
  removeUser,
  getUserSync,
  getUser,
  getToken,
  setCurrentStore,
  getCurrentStore,
};

