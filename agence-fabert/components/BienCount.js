import React from "react";
import styles from "../styles/BienCount.module.css";

export default function BienCount({ count }) {
  return (
    <div className={styles.countContainer}>
      {count > 0 ? (
        <p>{count} {count > 1 ? "biens trouvés" : "bien trouvé"}</p>
      ) : (
        <p>Aucun bien trouvé</p>
      )}
    </div>
  );
}
