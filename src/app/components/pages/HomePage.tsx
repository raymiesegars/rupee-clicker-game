"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";

import { useStateRupees } from "@/hooks/useStateRupees";
import { formatNumber } from "@/utils/utils";
import HelpersUi from "../Helpers/HelpersUi";
import BigNumber from "bignumber.js";
import Rupee from "@/models/Rupee";

export default function HomePage() {
  const {
    rupees,
    helpers,
    buyHelper,
    incrementGem,
    rupeesPerSecond,
    isClicked,
  } = useStateRupees();

  const formattedRupees = formatNumber(rupees);
  const [showModel, setShowModel] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  return (
    <section className="flex w-full flex-wrap items-center justify-between">
    {/* Left Section */}
    <div className="flex-1 items-center justify-center p-2">
      {/* Toggle Slider */}
      <div className="flex items-center justify-center p-4 head-text-sm">
      <span className="mr-2">3D Toggle:</span>
        <label className="switch relative inline-block w-14 h-8 bg-gray-300 rounded-full cursor-pointer">
            <input type="checkbox" className="sr-only" checked={showModel} onChange={() => setShowModel(!showModel)} />
            <span className="slider round absolute left-1 bottom-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out" 
                style={{ transform: showModel ? 'translateX(100%)' : 'translateX(0)' }}></span>
        </label>
      </div>

      
      <h3 className="head-text-sm">Non profit, open source.</h3>
      <h3 className="head-text-sm">All rights to Nintendo&#174;</h3>
      <p className="p-2">This game is in extremely early development, game data only saves locally at the moment however eventually cloud saves with leaderboards will be implemented.</p>{""}
      <p className="p-2">Game data saves to your local storage automatically every 60 seconds.</p>{""}
      <p className="p-2">This is an independent, non-commercial, fan-created project and is not affiliated with or endorsed by Nintendo Co., Ltd. It is open source and free. All original rights in the Zelda franchise belong to Nintendo. This game is intended for personal use only.</p>
    </div>

      {/* Center Section */}
      <div className="flex flex-1 flex-col items-center justify-center p-4 relative mb-32">
      <h3 className="head-text-md mb-6 text-center text-nowrap">
          Rupees: <span>{formattedRupees}</span>
        </h3>
        <h4 className="head-text-sm mb-12 text-center">
          Rupees per second: <span>{rupeesPerSecond.toFixed(1)}</span>
        </h4>
        <div className="relative w-full max-w-sm h-72">
          {showModel ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Canvas className={`absolute top-0 left-0 w-full h-full bg-transparent" ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
                onClick={() => {
                  incrementGem(new BigNumber(1));
                  }}
              >
              <perspectiveCamera position={[0, 0, 10]} fov={75} near={0.1} far={1000} />
              <ambientLight intensity={4} />
              <directionalLight position={[-1, 2, 4]} intensity={6} />
              <directionalLight position={[1, -1, -2]} intensity={1.5} color="#ffffff" />
              <pointLight position={[0, 0, 0]} color="#00ff00" intensity={1} distance={5} />
              <hemisphereLight intensity={3} position={[0, 50, 0]} />
                <Rupee 
                  position={[0, -3.80, 0]} 
                  scale={[.76, .76, .76]} 
                  isRotating={isRotating}
                  setIsRotating={setIsRotating}
                 />
              </Canvas>
            </Suspense>
          ) : (
            <Image
              src="/images/rupees/rupee-green.png"
              alt="rupee"
              width={150}
              height={150}
              onClick={() => {
                incrementGem(new BigNumber(1));
              }}
              className={`absolute top-0 left-0 w-full h-full object-scale-down cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:opacity-95 ${isClicked ? "clickAnimation" : ""}`}
              draggable="false"
            />
          )}
        </div>
      </div>

      {/* Right Section */}
      <HelpersUi helpers={helpers} buyHelper={buyHelper} />
    </section>
  );
}
