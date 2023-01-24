import { json } from "react-router-dom";

export const getUserToken = () => {
    const session = localStorage.getItem('userToken');
    if (session) {
        return session
    }
    return null;
};
export const removeUserToken = () =>{
    localStorage.removeItem("userToken")
}
