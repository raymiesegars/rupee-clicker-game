"use client";

import Image from "next/image";
import { useStateRupees } from "@/hooks/useStateRupees";
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
      <div className=" flex-1 items-center justify-center p-2">
        <h3 className="head-text-sm">Non profit, open source.</h3>
        <h3 className="head-text-sm">All rights to Nintendo&#174;</h3>
        <p className="p-2">This game is in extremely early development, game data only saves locally at the moment however eventually cloud saves with leaderboards will be implemented.</p>{""}
        <p className="p-2">Game data saves to your local storage automatically every 60 seconds.</p>{""}
        <p className="p-2">This is an independent, non-commercial, fan-created project and is not affiliated with or endorsed by Nintendo Co., Ltd. It is open source and free. All original rights in the Zelda franchise belong to Nintendo. This game is intended for personal use only.</p>
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
