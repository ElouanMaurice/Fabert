import React from "react";
import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Infos Agence */}
        <div className={styles.info}>
          <h3 className={styles.title}>KTI Immo</h3>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
            10 Rue du Port, 17410 Saint-Martin-de-Ré
          </p>
          <p>
            <FontAwesomeIcon icon={faPhoneAlt} className={styles.icon} />
            +33 6 12 34 56 78
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            kti.immo@gmail.com
          </p>
        </div>

        {/* Liens rapides */}
        <div className={styles.links}>
          <h3 className={styles.title}>Liens utiles</h3>
          <div className={styles.lienlink}>
            <Link className={styles.lien} href="/acheter">Biens à vendre</Link>
            <Link className={styles.lien} href="/louer">Locations annuelles</Link>
            <Link className={styles.lien} href="/louer">Locations saisonnières</Link>
            <Link className={styles.lien} href="/contact">Contact</Link>
          </div>
        </div>

        {/* Horaires */}
        <div className={styles.horaires}>
          <h3 className={styles.title}>Les Horaires</h3>
          {[
            ["Lundi", "9h00 - 18h00"],
            ["Mardi", "9h00 - 18h00"],
            ["Mercredi", "9h00 - 18h00"],
            ["Jeudi", "9h00 - 18h00"],
            ["Vendredi", "9h00 - 18h00"],
            ["Samedi", "10h00 - 16h00"],
            ["Dimanche", "Fermé"]
          ].map(([jour, heure]) => (
            <p key={jour}>
              <FontAwesomeIcon icon={faClock} className={styles.heure} />
              {jour} : {heure}
            </p>
          ))}
        </div>

        {/* Réseaux sociaux */}
        <div className={styles.social}>
          <h3 className={styles.title}>Suivez-nous</h3>
          <Link href="https://www.facebook.com/profile.php?id=100090186728685&locale=fr_FR" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className={styles.iconSocial} />
          </Link>
          <Link href="https://www.instagram.com/kti.immo_cathyfabert/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className={styles.iconSocial} />
          </Link>
        </div>
      </div>

      {/* Mentions légales */}
      <div className={styles.legal}>
        <p>
          © 2024 KTI Immo - <Link href="/mentions-legales">Mentions légales</Link> | <Link href="/confidentialite">Politique de confidentialité</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
