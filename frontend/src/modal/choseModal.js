import { NewTrip } from "../components/newTrip/newTrip";
import { NewUser } from "../components/newUser/newUser";
import Modal from "./modal";


const ChoseModal = ({whatModal, openModal, setOpenModal}) =>{
    if(whatModal === "newUser"){
        return(
            <Modal whatModal={whatModal} openModal={openModal} onClose={()=> setOpenModal(false)}>
                <NewUser />
            </Modal>
        )
    }

    else if(whatModal === "newTrip"){
        return(
            <Modal whatModal={whatModal} openModal={openModal} onClose={()=> setOpenModal(false)}>
                <NewTrip />
            </Modal>
        )
    }
    else if(whatModal=== "tripDetail"){
        return(
            <Modal whatModal={whatModal} openModal={openModal} onClose={()=> setOpenModal(false)}>
                <NewTrip />
            </Modal>
        )
    }
};


export default ChoseModal;