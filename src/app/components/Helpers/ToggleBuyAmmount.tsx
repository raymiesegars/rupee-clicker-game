import { ToggleBuyAmountProps } from "@/interfaces/types";
import { useState } from "react";

export default function ToggleBuyAmount({ setQuantity }: ToggleBuyAmountProps) {
  return (
    <div className="toggle-buy-amount">
      {[1, 5, 10, 100].map((amount) => (
        <button key={amount} onClick={() => setQuantity(amount)}>
          Buy {amount}
        </button>
      ))}
    </div>
  );
}
