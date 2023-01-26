export const getStorageObject = (key) => {
	 const item = localStorage.getItem(key);
	if(item !== "undefined"){
		return JSON.parse(item);
	}
	return undefined;
};

export const setStorageObject = (key, object) => {
	localStorage.setItem(key, JSON.stringify(object));
}

export const deleteStorageObject = (key) => {
	localStorage.removeItem(key);
}
