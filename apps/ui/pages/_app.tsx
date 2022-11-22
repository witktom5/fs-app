import '../styles/globals.css'
import type { AppProps } from 'next/app'

const myFn = (sth) => sth

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
