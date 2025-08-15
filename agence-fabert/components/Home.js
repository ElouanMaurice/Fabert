import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Content from '../components/Content';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';


function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Menu />
      <Content/>
      <ContactForm/>
      <Footer />
    </div>
  );
}

export default Home;
