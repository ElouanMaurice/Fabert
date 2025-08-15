import React from 'react';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';


const contact = () => {
  return (
    <div>
      <Header />
      <ContactForm/>
      <Footer/>
    </div>
  );
 
};

export default contact;