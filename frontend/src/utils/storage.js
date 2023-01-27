
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
=======
import { json } from "react-router-dom";

export const getUserToken = () => {
    const session = localStorage.getItem('userToken');
    if (session) {
        const data = JSON.parse(session)
        return data.userObj.name
    }
    return null;
};
export const removeUserToken = () =>{
    localStorage.removeItem("userToken")
}
