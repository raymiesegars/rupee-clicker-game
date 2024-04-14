import Head from "next/head";
import HomePage from "./components/pages/HomePage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Rupee Clicker</title>
        <meta
          name="description"
          content="Afk clicker game where the goal is to increase your Rupee income as much as possible."
        />
      </Head>

      <HomePage />
    </main>
  );
}
