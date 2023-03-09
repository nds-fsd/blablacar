import { NewTrip } from "../components/newTrip/newTrip";
import { NewUser } from "../components/newUser/newUser";
import { Login } from "../components/login/login";
import TripExtended from "../components/TripExtended/TripExtended";
import Modal from "./modal";
import React from "react";

const jsxelement = {
    NewUser: NewUser,
    Login: Login,
    NewTrip: NewTrip,
    TripExtended: TripExtended
};
const ChoseModal = ({whatModal, openModal, setOpenModal}) =>{
    console.log(whatModal);
 const JsxRender=jsxelement[whatModal]   

    return(
                            <Modal openModal={openModal} whatModal={whatModal} onClose={()=> setOpenModal(false)}>
                                {<JsxRender/>}
                            </Modal>
                            )
    }

export default ChoseModal;