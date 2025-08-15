import React from 'react';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Honoraire from '../components/Honoraire';


const honoraires = () => {
  return (
    <div>
      <Header />
      <Honoraire/>
      <Footer />
    </div>
  );
 
};

export default honoraires;