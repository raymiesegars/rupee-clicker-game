import Head from "next/head";
import HomePage from "./components/pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="my-toast"
        progressClassName="my-toast-progress"
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Head>
          <title>Rupee Clicker</title>
          <link rel="icon" href="/myicon.ico" />
          <meta
            name="description"
            content="Afk clicker game where the goal is to increase your Rupee income as much as possible."
          />
        </Head>
        <HomePage />
      </main>
    </>
  );
}
