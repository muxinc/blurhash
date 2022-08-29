import type { AppProps } from 'next/app';
// TODO: is there a more elegant way to import this other than from src?
//       why am I not allowed to import this at the component level, and @reach/dialog/styles.css is?
import '@mux/mux-player-react-lazy/src/styles.css';

function Example({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Example;
