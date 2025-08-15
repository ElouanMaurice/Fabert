import styles from '../styles/Menu.module.css';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Menu = () => {
  return (
      <div className={styles.container}>
      <div className={styles.contactmenu}>
        <p className={styles.contact}>kti.immo@gmail.com</p>
      <p className={styles.contact }>0652626819</p>
      <FontAwesomeIcon icon={faFacebook} className={styles.icon}/>
      <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
    
      </div>
         <div className={styles.title}>
            <h1 >KTI IMMO</h1>
        </div>
        <div className={styles.soustitle}>
            <h2 >Votre clé pour l’Île de Ré !</h2>
        </div>
      {/* L'image de fond en haut, occupe toute la largeur */}
      <img className={styles.photo} src="/fond1.jpg" alt="Photo l'île de Ré" />
    </div>
  );
};

export default Menu;