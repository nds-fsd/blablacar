import { useState , useEffect } from "react";
import { Request } from "../../utils/apiWrapper";
import styles from "./ListUsers.module.css";

export const UsersList = () => {
  const [users,SetUsers]= useState()

  useEffect(() => {
    let ignore=false
    const getUsers = async () => {
      try {
        let response = await Request("users");
        console.log(response);
        !ignore && SetUsers(response);
        console.log(users);
      } catch (error) {
        alert(error)
      ;
      }
    };
    getUsers();
    if(users){ignore=true}
   
  }, );

  

  return (
    
    
    <div className={styles.listWrap}>
      <div className={styles.itemWrap}><p>Nombre</p><p>Apellido</p><p>Correo electrónico</p></div>
      {users && users.map((e)=>(
        <div key={e._id} className={styles.itemWrap}><p>{e.name}</p><p>{e.surname}</p><p>{e.email}</p></div>
      ))}
      
      
    </div>
  );
};
