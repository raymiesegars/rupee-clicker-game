"use client";

import Image from "next/image";
import { useStateRupees } from "@/hooks/useStateRupees";
import { useEffect } from "react";
import { formatNumber } from "@/utils/utils";
import HelpersUi from "../Helpers/HelpersUi";
import BigNumber from "bignumber.js";

export default function HomePage() {
  const {
    rupees,
    helpers,
    buyHelper,
    incrementGem,
    rupeesPerSecond,
    isClicked,
  } = useStateRupees();

  const formattedRupees = formatNumber(rupees);

  return (
    <section className="flex w-full flex-wrap items-center justify-between">
      {/* Left Section */}
      <div className="flex flex-1 items-center justify-center p-4">
        <h3 className="head-text-md">Left</h3>
      </div>

      {/* Center Section */}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <h3 className="head-text-md mb-6 text-center">
          Rupees: <span>{formattedRupees}</span>
        </h3>
        <h4 className="head-text-sm mb-12 text-center">
          Rupees per second: <span>{rupeesPerSecond.toFixed(1)}</span>
        </h4>
        <Image
          src="/images/rupees/rupee-green.png"
          alt="diamond"
          width={150}
          height={150}
          onClick={() => {
            incrementGem(new BigNumber(1));
          }}
          draggable="false"
          className={`cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:opacity-95 ${isClicked ? "clickAnimation" : ""}`}
        />
      </div>

      {/* Right Section */}
      <HelpersUi helpers={helpers} buyHelper={buyHelper} />
    </section>
  );
}
