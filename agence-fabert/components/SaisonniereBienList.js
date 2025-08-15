import React from "react";
import SaisonniereBien from "./SaisonniereBien"; // Mise à jour du nom du composant importé
import styles from '../styles/SaisonniereBienList.module.css';
import BienCount from "./BienCount";


const SaisonniereBienList = ({ saisonnieres }) => {
  if (!saisonnieres || !Array.isArray(saisonnieres)) {
    return <p>Aucun bien locatif disponible.</p>;
  }
  return (
    <div>
       <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <BienCount count={saisonnieres.length} />
      </div>
    <div className={styles.propertyGrid}>
      {saisonnieres.map((saison) => (
        <SaisonniereBien key={saison._id} saison={saison} />
      ))}
    </div>
    </div>
  );
};


export default SaisonniereBienList;
