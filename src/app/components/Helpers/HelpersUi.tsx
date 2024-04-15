import { useState } from "react";
import Helper from "./Helper";
import ToggleBuyAmount from "./ToggleBuyAmmount";
import { HelperUiProps } from "@/interfaces/types";

export default function HelpersUi({ helpers, buyHelper }: HelperUiProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded border-2 border-gray-500 p-4 ">
      <h3 className="head-text-md mb-12 text-center">Helpers</h3>
      <ToggleBuyAmount setQuantity={setQuantity} />
      {helpers.map((helper) => (
        <Helper
          key={helper.name}
          helper={helper}
          buyHelper={buyHelper}
          quantity={quantity}
        />
      ))}
    </div>
  );
}
