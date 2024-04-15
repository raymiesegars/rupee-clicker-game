import BigNumber from "bignumber.js";


export interface DekuScrubHelperProps {
  level: number;
  onBuy: () => void;
  cost: BigNumber;
  baseProduction: number;
}

export interface Helper {
  name: string;
  image: string;
  costBase: BigNumber;
  productionBase: number;
  level: number;
  costIncreaseFactor: number; // Factor by which the cost increases per level
}

export interface HelperProps {
  helper: Helper;
  buyHelper: (name: string, quantity: number) => void;
  quantity: number; // Number of helpers to buy per click, set by ToggleBuyAmount
}

export interface HelperUiProps {
  helpers: Helper[];
  buyHelper: (name: string, quantity: number) => void;
}

export interface ToggleBuyAmountProps {
  setQuantity: (quantity: number) => void;
}
