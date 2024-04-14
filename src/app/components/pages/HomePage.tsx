"use client";

import Image from "next/image";

import { useStateRupees } from "@/hooks/useStateRupees";
import DekuScrubHelper from "../Helpers/DekuScrubHelper";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { formatNumber } from "@/utils/utils";

export default function HomePage() {
  const { rupees, dekuScrubLevel, updateDekuScrubLevel, rupeesPerSecond, isClicked, incrementGem } = useStateRupees();

  useEffect(() => {
    const interval = setInterval(() => {
      incrementGem(rupeesPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [rupeesPerSecond, incrementGem]);

  const BASE_COST = new BigNumber(10); // The base cost for the first DekuScrub
  const COST_INCREASE_FACTOR = 1.15; // The factor by which the cost increases per level
  const calculateCost = (level: number): BigNumber => {
    return BASE_COST.multipliedBy(
      new BigNumber(COST_INCREASE_FACTOR).pow(level),
    );
  };

  const buyDekuScrub = () => {
    const currentCost = calculateCost(dekuScrubLevel);
    if (rupees.gte(currentCost)) {
      incrementGem(currentCost.negated());
      updateDekuScrubLevel(dekuScrubLevel + 1); // Use updateDekuScrubLevel instead of setDekuScrubLevel
    }
  };

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
          onClick={() => incrementGem()}
          draggable="false"
          className={`cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:opacity-95 ${isClicked ? "clickAnimation" : ""}`}
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <h3 className="head-text-md mb-12 text-center">Helpers</h3>
        <DekuScrubHelper
          level={dekuScrubLevel}
          onBuy={buyDekuScrub}
          cost={calculateCost(dekuScrubLevel)}
          baseProduction={0.1}
        />
      </div>
    </section>
  );
}
