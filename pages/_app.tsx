import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import type { AppProps } from "next/app";
import Layout from "../comps/layout";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default MyApp;
