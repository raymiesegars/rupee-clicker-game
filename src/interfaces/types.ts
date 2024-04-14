import BigNumber from "bignumber.js";

export interface DekuScrubHelperProps {
  level: number;
  onBuy: () => void;
  cost: BigNumber;
  baseProduction: number;
}
