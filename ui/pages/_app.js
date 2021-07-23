import '../styles/globals.css';
import '../styles/tailwind.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'antd/dist/antd.css';
import Head from 'next/head';
import { AuthProvider } from '../utils/authContext';

const showProgressBar = (delay) => {
  const timer = setTimeout(() => NProgress.start(), delay);
  Router.events.on('routeChangeComplete', () => stopProgress(timer));
  Router.events.on('routeChangeError', () => stopProgress(timer));
};

const stopProgress = (timer) => {
  clearTimeout(timer);
  NProgress.done();
};

Router.events.on('routeChangeStart', () => showProgressBar(300));

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
        <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
        <title>Hayok Medicare</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
