import type { AppProps } from "next/app";
import "@vercel/examples-ui/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default App;
