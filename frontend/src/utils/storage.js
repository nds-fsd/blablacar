export const getStorageObject = (key) => {
	 const item = localStorage.getItem(key);
	if(item !== "undefined"){
		return JSON.parse(item);
	}
	return undefined;
};

export const setStorageObject = (key, object) => {
	console.log(key,object);
	localStorage.setItem(key, JSON.stringify(object));
}

export const deleteStorageObject = (key) => {
	localStorage.removeItem(key);
}
export const getUserToken = () => {
    const session = getStorageObject('user-session');
    if (session) {
		return session; 
    }
    return null;
};
