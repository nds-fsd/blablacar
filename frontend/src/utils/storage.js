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
