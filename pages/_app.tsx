import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../comps/header';
import Footer from '../comps/footer'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Header></Header>
  <Component {...pageProps} />
  <Footer></Footer>
  </>
}
export default MyApp
