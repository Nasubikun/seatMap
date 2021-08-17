import '../styles/globals.css'
import {useEffect} from 'react'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return <>
  <Head>
    <title>seatMap(demo)</title>
  </Head>
  <Component {...pageProps} />
  </>
}

export default MyApp
