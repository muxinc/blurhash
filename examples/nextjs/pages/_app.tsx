import type { AppProps } from 'next/app';

function Example({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Example;
