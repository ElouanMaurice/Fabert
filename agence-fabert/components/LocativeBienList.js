import React from "react";
import LocativeBien from "./LocativeBien";
import styles from '../styles/LocativeBienList.module.css';
import BienCount from "./BienCount";

export default function LocativeBienList({ locations }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
              <BienCount count={locations.length} />
            </div>
    <div className={styles.propertyGrid}>
      {locations.map((loc) => (
        <LocativeBien key={loc._id} location={loc} />
      ))}
    </div>
     </div>
  );
}
