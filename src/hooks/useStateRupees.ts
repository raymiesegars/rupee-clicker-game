import { useEffect, useState, useRef } from "react";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";

export function useStateRupees() {
  const [rupees, setRupees] = useState<BigNumber>(new BigNumber(0));
  const [dekuScrubLevel, setDekuScrubLevel] = useState<number>(0);
  const [isClicked, setIsClicked] = useState(false);

  //Refs
  const rupeesRef = useRef<BigNumber | null>(null);
  const dekuScrubLevelRef = useRef<number>(0);

  // Update refs inside the state setters
  function updateRupees(value: BigNumber) {
    setRupees(value);
    rupeesRef.current = value;
  }

  function updateDekuScrubLevel(value: number) {
    console.log("Updating DekuScrubLevel to:", value);
    setDekuScrubLevel(value);
    dekuScrubLevelRef.current = value;
  }

  useEffect(() => {
    const savedData = localStorage.getItem("gameData");
    if (savedData) {
      const data = JSON.parse(savedData);
      const loadedRupees = new BigNumber(data.rupees || 0);
      const loadedDekuScrubLevel = data.dekuScrubLevel || 0;
      updateRupees(loadedRupees);
      updateDekuScrubLevel(loadedDekuScrubLevel);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const data = {
        rupees: rupeesRef.current?.toString() || "0",
        dekuScrubLevel: dekuScrubLevelRef.current || 0,
      };
      console.log("Saving data:", data); // Debug log

      localStorage.setItem("gameData", JSON.stringify(data));
      toast.info("Game data saved successfully!", {
        position: "bottom-right",
      });
    }, 60000); // Save every 1 minutes

    return () => {
      clearInterval(intervalId);
    }; // Clear interval on unmount
  }, []);

  function incrementGem(amount: number | BigNumber = 1) {
    updateRupees(rupees.plus(amount));
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Reset after the duration of the animation
  }

  return {
    rupees,
    dekuScrubLevel,
    updateDekuScrubLevel,
    isClicked,
    incrementGem,
  };
}
