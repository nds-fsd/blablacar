import { useState, useEffect } from "react";
import styles from "./ListTrips.module.css";

export const TripList = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrip = async () => {
      try {
        const response = await fetch("http://localhost:3001/trip");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError("Error");
      }
    };
    getTrip();
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

// import { useState, useEffect } from "react";
// import styles from "./ShowListTrip.module.css";

// export const TripList = () => {
//   const [items, setItems] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getTrips = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/trip");
//         const data = await response.json();
//         setItems(data);
//       } catch (error) {
//         setError("Error al obtener los datos de la API");
//       }
//     };
//     getTrips();
//   }, []);

//   return (
//     <div>
//       {error && <p>{error}</p>}
//       {items &&
//         items.map((item) => (
//           <div key={item.id}>
//             <p>{item.name}</p>
//           </div>
//         ))}
//     </div>
//   );
// };
