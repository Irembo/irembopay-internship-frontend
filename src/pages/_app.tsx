import '@/styles/globals.css'
import "@/styles/nprogress.css";
import type { AppProps } from 'next/app'
import { makeStore } from "../redux/store";
import { Provider } from "react-redux";

import NProgress from "nprogress";

import { useRouter } from "next/router";
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Provider store={makeStore}><Component {...pageProps} /></Provider>
}
