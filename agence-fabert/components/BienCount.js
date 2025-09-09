import React from "react";
import styles from "../styles/BienCount.module.css";

export default function BienCount({ count, loading }) {
  return (
    <div className={styles.countContainer}>
      {loading ? (
        <p>Chargement des biens...</p>
      ) : count > 0 ? (
        <p>
          {count} {count > 1 ? "biens trouvés" : "bien trouvé"}
        </p>
      ) : (
        <p>Aucun bien trouvé</p>
      )}
    </div>
  );
}
