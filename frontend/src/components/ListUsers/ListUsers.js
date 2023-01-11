import { useState, useEffect } from "react";
import styles from "./ListUsers.module.css";

export const UsersList = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError("Error");
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {items &&
        items.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        ))}
    </div>
  );
};
