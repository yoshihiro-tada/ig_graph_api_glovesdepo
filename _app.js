import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // サーバーサイドレンダリング時にCSPを設定
    if (typeof window !== 'undefined') {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self'; script-src 'self' https://ig-graph-api-glovesdepo.vercel.app/; img-src 'self' data;";
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, []);

  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;