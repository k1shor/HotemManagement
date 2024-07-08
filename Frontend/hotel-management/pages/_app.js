// import Navbar from "@/components/Navbar";
import StoreProvider from "@/reduxStore/StoreProvider";
import "@/styles/globals.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    console.log("hello");
  }, []);
  return (
    <>
      <StoreProvider>
        <Header />
        <Component {...pageProps} />
        <h1>Footer</h1>
        <Toaster />
      </StoreProvider>
    </>
  );
}
