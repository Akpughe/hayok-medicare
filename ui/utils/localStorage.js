const localStorageKey = 'hayok';
// import setAuthToken from "./setAuthToken";
export const getUser = () => {
  try {
    // const serializedUser = setAuthToken(localStorage.token);
    const serializedUser = localStorage.getItem(localStorageKey);
    if (serializedUser === null) {
      return undefined;
    }
    return JSON.parse(serializedUser);
  } catch (e) {
    throw new Error('Could not fetch user object from local storage');
  }
};

export const saveUser = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem(localStorageKey, serializedUser);
  } catch (e) {
    throw new Error('Could not save user object to local storage');
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem(localStorageKey);
  } catch (e) {
    throw new Error('Could not delete user object from local storage');
  }
};