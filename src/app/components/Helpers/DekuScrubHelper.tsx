import { DekuScrubHelperProps } from "@/interfaces/types";
import Image from "next/image";
import BigNumber from "bignumber.js";
import { formatNumber } from "@/utils/utils";

export default function DekuScrubHelper({
  level,
  onBuy,
  cost,
  baseProduction,
}: DekuScrubHelperProps) {
  const formattedCost = formatNumber(cost);
  const currentProduction = new BigNumber(baseProduction).multipliedBy(level);
  const formattedProduction = formatNumber(currentProduction);

  return (
    <button
      onClick={onBuy}
      className="shadow-light flex h-24 w-full items-center justify-between rounded border-2 border-gray-500 p-4 md:w-96"
    >
      <div className="left-section flex items-center justify-center">
        <Image
          src="/images/helpers/deku-scrub-base.png"
          alt="deku scrub helper"
          width={65}
          height={65}
          draggable="false"
        />
      </div>

      <div className="middle-section flex flex-col items-center justify-center">
        <h4 className="text-white">Deku Scrub</h4>
        <div className="flex p-2">
          <p className="pr-2 text-white">Cost: {formattedCost}</p>
          <Image
            src="/images/rupees/rupee-green.png"
            alt="diamond"
            width={12}
            height={12}
            draggable="false"
          />
          
        </div>
      </div>
      <div className="right-section">
        <p className="text-white">Level {level}</p>
        <div className="flex p-2">
          <p className="pr-2 text-white">r/s: {formattedProduction}</p>
        </div>
      </div>
    </button>
  );
}
