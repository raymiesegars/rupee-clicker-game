'use client'

import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { Helper } from "@/interfaces/types";
import { defaultHelpers } from "@/interfaces/helpers";

const rupeesContext = React.createContext(0);

export function useStateRupees() {
  const [rupees, setRupees] = useState(new BigNumber(0));
  const [helpers, setHelpers] = useState<Helper[]>([
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
      productionBase: 10,
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
    // Additional helpers can be added here
  ]);
  const [rupeesPerSecond, setRupeesPerSecond] = useState(new BigNumber(0));
  const [isClicked, setIsClicked] = useState(false);
  
  const rupeesRef = useRef(rupees);
  const helpersRef = useRef(helpers);
  const lastToastTimeRef = useRef(0); // Ref to track the last toast time

  const toastCooldown = 3000; // Cooldown in milliseconds (e.g., 3000ms or 3 seconds)

  // Update refs whenever rupees or helpers change
  useEffect(() => {
    rupeesRef.current = rupees;
  }, [rupees]);

  useEffect(() => {
    helpersRef.current = helpers;
  }, [helpers]);

  useEffect(() => {
    const totalRPS = helpers.reduce(
      (acc, helper) =>
        acc.plus(
          new BigNumber(helper.productionBase).multipliedBy(helper.level),
        ),
      new BigNumber(0),
    );
    setRupeesPerSecond(totalRPS);
  }, [helpers]);

  useEffect(() => {
    const savedData = localStorage.getItem("gameData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setRupees(new BigNumber(data.rupees || 0));
      
      // Merge saved helpers with default helpers
      const loadedHelpers = defaultHelpers.map(defaultHelper => {
        const savedHelper = data.helpers.find((h: Helper) => h.name === defaultHelper.name);
        if (savedHelper) {
          return {
            ...defaultHelper,
            ...savedHelper,
            costBase: new BigNumber(savedHelper.costBase),
            level: savedHelper.level,
          };
        } else {
          return defaultHelper; // Use default if no saved data exists for this helper
        }
      });
      
      setHelpers(loadedHelpers);
    } else {
      // Use default helpers if no saved data exists
      setHelpers(defaultHelpers);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const data = {
        rupees: rupeesRef.current.toString(), // Use ref instead of state
        helpers: helpersRef.current.map((helper) => ({
          // Use ref instead of state
          ...helper,
          costBase: helper.costBase.toString(), // Convert BigNumber to string for storage
          level: helper.level,
        })),
      };
      localStorage.setItem("gameData", JSON.stringify(data));
      toast.info("Game data saved successfully!", { position: "bottom-right" });
    }, 60000); // Save every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  const buyHelper = useCallback((name: string, quantity: number) => {
    setHelpers((prevHelpers) => {
      const updatedHelpers = prevHelpers.map(helper => {
        if (helper.name === name) {
          const cost = calculateCost(helper, quantity);
          if (rupees.gte(cost)) {
            setRupees(prevRupees => prevRupees.minus(cost));
            return { ...helper, level: helper.level + quantity };
          } else {
            const currentTime = Date.now();
            if (currentTime - lastToastTimeRef.current > toastCooldown) {
              toast.error("Not enough rupees!", { position: "bottom-right" });
              lastToastTimeRef.current = currentTime;
            }
          }
        }
        return helper;
      });
      return updatedHelpers;
    });
  }, [rupees]);

  const calculateCost = (helper: Helper, quantity: number): BigNumber => {
    let totalCost = new BigNumber(0);
    for (let i = 0; i < quantity; i++) {
      totalCost = totalCost.plus(
        helper.costBase.multipliedBy(
          new BigNumber(helper.costIncreaseFactor).pow(helper.level + i),
        ),
      );
    }
    console.log(
      "Total calculated cost for",
      quantity,
      "units:",
      totalCost.toString(),
    );
    return totalCost;
  };

  const incrementGem = useCallback((amount: BigNumber) => {
    setRupees((rupees) => rupees.plus(amount));
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  }, []);

  useEffect(() => {
    const incrementPerSecond = setInterval(() => {
      incrementGem(rupeesPerSecond);
    }, 1000);
    return () => clearInterval(incrementPerSecond);
  }, [rupeesPerSecond, incrementGem]);

  return {
    rupees,
    helpers,
    buyHelper,
    rupeesPerSecond,
    incrementGem,
    isClicked,
  };
}
