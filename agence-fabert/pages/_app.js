import '../styles/globals.css';
import Head from 'next/head';



import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600'] });
function App({ Component, pageProps }) {
  return (
    <>
      <Head className={montserrat.className}>
        <title>Next.js App</title>
      </Head>
      

      <Component {...pageProps} />
    </>
  );
}

export default App;
