import Header from "./Header";
import styles from '../styles/ContactForm.module.css';

// Importation correcte de FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const ContactForm = () => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <h1 className={styles.title}>Contactez-nous</h1>
        <p className={styles.description}>Nous sommes à votre écoute pour toute question.</p>
        
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faPhoneAlt} className={styles.icon} />
            <p>+33 6 12 34 56 78</p>
          </div>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            <p>kti.immo@gmail.com</p>
          </div>
        </div>

        <div className={styles.socialMedia}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          </a>
        </div>

        <form className={styles.form}>
          <input type="text" className={styles.input} placeholder="Votre nom" />
          <input type="email" className={styles.input} placeholder="Votre email" />
          <input type="reference" className={styles.input} placeholder="Référence du bien" />
          <textarea className={styles.textarea} placeholder="Votre message"></textarea>
          <button type="submit" className={styles.button}>Envoyer</button>
        </form>
      </main>
    </div>
  );
};

export default ContactForm;
