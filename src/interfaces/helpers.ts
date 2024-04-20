import BigNumber from "bignumber.js";

export const defaultHelpers = [
  {
    name: "Deku Scrub",
    image: "/images/helpers/deku-scrub-base.png",
    costBase: new BigNumber(10),
    productionBase: 0.1,
    level: 0,
    costIncreaseFactor: 1.15,
  },
  {
    name: "Cucco",
    image: "/images/helpers/cucco-base.png",
    costBase: new BigNumber(100),
    productionBase: 1,
    level: 0,
    costIncreaseFactor: 1.15,
  },
  {
    name: "Korok",
    image: "/images/helpers/korok-base.png",
    costBase: new BigNumber(1000),
    productionBase: 9,
    level: 0,
    costIncreaseFactor: 1.15,
  },
  {
    name: "Minish",
    image: "/images/helpers/minish-base.png",
    costBase: new BigNumber(12500),
    productionBase: 45,
    level: 0,
    costIncreaseFactor: 1.15,
  },
  {
    name: "Rito",
    image: "/images/helpers/rito-base.png",
    costBase: new BigNumber(135000),
    productionBase: 255,
    level: 0,
    costIncreaseFactor: 1.15,
  },
]