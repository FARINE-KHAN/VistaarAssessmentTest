// Local Storage
export const newLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteLocalStorage = (key, indexToRemove) => {
  // localStorage.removeItem(key);
  let data = useLocalStorage(key);
  data.splice(indexToRemove, 1);
  newLocalStorage("movies", data);
};

export const useLocalStorage = (key) => {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : null;
};
