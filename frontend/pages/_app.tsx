import type { AppProps } from "next/app";
// import "tailwindcss/tailwind.css";
import "../styles/global.scss";
import Router from "next/router";
import Layout from "../components/Layout";
import nProgress from "nprogress";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <>
        <Component {...pageProps} />
      </>
    </Layout>
  );
}

export default MyApp;
