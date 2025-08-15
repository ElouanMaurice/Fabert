import React from "react";
import AchatBien from "./AchatBien";
import styles from '../styles/AchatBienList.module.css';
import BienCount from "./BienCount";



const AchatBienList = ({ properties }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <BienCount count={properties.length} />
      </div>
    <div className={styles.propertyGrid}>

      {properties.map((property) => (
        <AchatBien key={property._id} property={property} />
      ))}
    </div>
     </div>
  );
};

export default AchatBienList;

