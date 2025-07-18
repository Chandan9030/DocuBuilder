// Save data to localStorage
export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Get data from localStorage
export const getFromLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return null;
  }
};

// Clear specific data from localStorage
export const clearFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing from localStorage:', error);
  }
};

// Clear all data from localStorage
export const clearAllLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing all localStorage:', error);
  }
};