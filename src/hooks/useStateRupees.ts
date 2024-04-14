import { useEffect, useState } from "react";

export function useStateRupees() {
  const [rupees, setRupees] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const savedRupees = localStorage.getItem("rupees");
    if (savedRupees) {
      setRupees(Number(savedRupees));
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        localStorage.setItem("rupees", String(rupees));
      },
      5 * 60 * 1000,
    ); // Save every 5 minutes

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [rupees]);

  function incrementGem() {
    setRupees(rupees + 1);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Reset after the duration of the animation
  }

  return { rupees, isClicked, incrementGem };
}
