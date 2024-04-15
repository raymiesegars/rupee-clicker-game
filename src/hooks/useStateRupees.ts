'use client'

import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { Helper } from "@/interfaces/types";

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
    // Additional helpers can be added here
  ]);
  const [rupeesPerSecond, setRupeesPerSecond] = useState(new BigNumber(0));
  const [isClicked, setIsClicked] = useState(false);
  
  const rupeesRef = useRef(rupees);
  const helpersRef = useRef(helpers);

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
      if (data.helpers) {
        setHelpers(
          data.helpers.map((helper: Helper) => ({
            ...helper,
            costBase: new BigNumber(helper.costBase),
            level: helper.level,
          })),
        );
      }
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

  const buyHelper = useCallback(
    (name: string, quantity: number) => {
      setHelpers((prevHelpers) => {
        
        const updatedHelpers = prevHelpers.map((helper) => {
          if (helper.name === name) {
            const cost = calculateCost(helper, quantity);

            if (rupees.gte(cost)) {
              // Perform rupee subtraction outside the mapping to avoid multiple deductions
              setRupees((prevRupees) => {
                const newRupees = prevRupees.minus(cost);

                return newRupees;
              });
              console.log({...helper, level: helper.level + quantity})
              return { ...helper, level: helper.level + quantity };
            } else {
              toast.error("Not enough rupees!", { position: "bottom-right" });
            }
          }
          console.log(helper)
          return helper;
        });
        return updatedHelpers;
      });
    },
    [rupees],
  );

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
