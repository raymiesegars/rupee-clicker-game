import { ToggleBuyAmountProps } from "@/interfaces/types";
import { useState } from "react";

export default function ToggleBuyAmount({ setQuantity }: ToggleBuyAmountProps) {
  // Initialize the selectedAmount state to 1 to show the default selection
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleSelection = (quantity: number) => {
    setSelectedQuantity(quantity);  // Update the state to the new amount
    setQuantity(quantity);        // Update the parent component's state
  }

  return (
    <div className="toggle-buy-amount flex flex-col items-center py-4">
      <div className="text-lg font-bold mb-2">Buy</div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 5, 10, 100].map((quantity) => (
          <button
            key={quantity}
            onClick={() => handleSelection(quantity)}
            // Apply different styling if the amount is the currently selected amount
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow
              ${selectedQuantity === quantity ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'}`}
          >
            x{quantity}
          </button>
        ))}
      </div>
    </div>
  );
}
