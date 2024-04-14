"use client";

import Head from "next/head";
import Image from "next/image";
import HelperBox from "./Helpers/HelperBox";
import { useStateRupees } from "@/hooks/useStateRupees";

export default function HomePage() {
  const { rupees, isClicked, incrementGem } = useStateRupees();

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
        <div className="main flex select-none">
          {/* Will display current total currency of player */}
          <div className="">
            <h3 className="mb-4 text-center">
              Rupees: <span className="">{rupees}</span>
            </h3>
            <Image
              src="/images/rupees/rupee-green.png"
              alt="diamond"
              width={150}
              height={150}
              onClick={incrementGem}
              draggable="false"
              className={`cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:opacity-95 ${isClicked ? "clickAnimation" : ""}`}
            />
          </div>

          {/* Will display upgrades for player to purchase */}
          <div className="right">
            {/* Individual helper units */}
            <HelperBox />
          </div>
        </div>
      </section>
    </>
  );
}
