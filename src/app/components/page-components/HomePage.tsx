import Head from "next/head";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Rupee Clicker</title>
        <meta
          name="description"
          content="Afk clicker game where the goal is to increase your Rupee income as much as possible."
        />
      </Head>

      <section>
        <div className="main">
          {/* Will display current total currency of player */}
          <div className="left">
            <h3>Rupies: 0</h3>
            <Image
              src="/images/rupees/rupee-green.png"
              alt="diamond"
              width={150}
              height={150}
            />
          </div>

          <div className="right"></div>
        </div>
      </section>
    </>
  );
}
