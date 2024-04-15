import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import BigNumber from "bignumber.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: BigNumber): string {
  const number = num.toNumber();
  if (number >= 1e12) {
    return num.dividedBy(1e12).toFixed(2) + ' Tril';
  } else if (number >= 1e9) {
    return num.dividedBy(1e9).toFixed(2) + ' Bil';
  } else if (number >= 1e6) {
    return num.dividedBy(1e6).toFixed(2) + ' Mil';
  } else if (number >= 1e3) {
    return num.dividedBy(1e3).toFixed(2) + ' K';
  } else {
    return num.toFixed(2);
  }
}
