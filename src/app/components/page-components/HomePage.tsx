"use client";

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [rupees, setRupees] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  // Load rupees from localStorage when component mounts
  useEffect(() => {
    const savedRupees = localStorage.getItem("rupees");
    if (savedRupees) {
      setRupees(Number(savedRupees));
    }
  }, []);

  // Save rupees to localStorage whenever it changes
  useEffect(() => {
    const intervaliId = setInterval(
      () => {
        localStorage.setItem("rupees", String(rupees));
      },
      5 * 60 * 1000,
    ); // Save every 5 minutes
  }, [rupees]);

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
            <div className="helper flex h-24 w-96 items-center border justify-center">
              <div className="left-section flex justify-center items-center">
                <Image
                  src="/images/helpers/deku-scrub-base.png"
                  alt="deku scrub helper"
                  width={65}
                  height={65}
                  draggable="false"
                />
              </div>

              <div className="middle-section flex justify-center items-center flex-col">
                <h4>Deku Scrub</h4>
                <div className="flex p-2">
                  <p className="pr-2">Cost: 10</p>
                  <Image
                    src="/images/rupees/rupee-green.png"
                    alt="diamond"
                    width={15}
                    height={15}
                    draggable="false"
                  />
                </div>
              </div>
              <div className="right section">
                <p>level 0</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
