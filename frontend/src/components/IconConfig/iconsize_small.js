import { IconContext } from "react-icons";

export default function ConfigIcon({ children }) {

    return (
        <>
            <IconContext.Provider value={{ size:"2em" }}>
                {children}
            </IconContext.Provider>
        </>
    );
}