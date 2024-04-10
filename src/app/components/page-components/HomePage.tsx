"use client";

import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [rupees, setRupees] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  function incrementGem() {
    setRupees(rupees + 1);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Reset after the duration of the animation
  }

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
        <div className="main flex">
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
              className={`cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:opacity-95 ${isClicked ? "clickAnimation" : ""}`}
            />
          </div>

          {/* Will display upgrades for player to purchase */}
          <div className="right">right</div>
        </div>
      </section>
    </>
  );
}
