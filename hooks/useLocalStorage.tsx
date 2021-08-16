import { useState } from "react";

const getLocalStorage = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return item != null ? JSON.parse(item) : defaultValue;
};

export const useLocalStorage = (key,defaultValue) => {
  const [item] = useState(getLocalStorage(key,defaultValue));

  return item;
};