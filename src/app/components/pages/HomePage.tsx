"use client";

import Image from "next/image";

import { useStateRupees } from "@/hooks/useStateRupees";
import DekuScrubHelper from "../Helpers/DekuScrubHelper";


export default function HomePage() {
  const { rupees, isClicked, incrementGem } = useStateRupees();

  return (
    <section className="flex w-full flex-wrap items-center justify-between">
      {/* Left Section */}
      <div className="flex flex-1 items-center justify-center p-4">
        <h3 className="head-text-md">Left</h3>
      </div>

      {/* Center Section */}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <h3 className="mb-12 text-center head-text-md">
          Rupees: <span>{rupees}</span>
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

      {/* Right Section */}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <h3 className="text-center mb-12 head-text-md">Helpers</h3>
        <DekuScrubHelper />
      </div>
    </section>
  );
}
