import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp;
