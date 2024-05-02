import React, { SetStateAction, useCallback, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import rupeeModel from "../assets/3d/rupee.glb"
import { useFrame, useThree } from '@react-three/fiber';
import { a } from "@react-spring/three";
import { Group } from 'three';

interface RupeeProps {
  isRotating: boolean;
  setIsRotating: React.Dispatch<SetStateAction<boolean>>;
  [key: string]: any;
}

const Rupee: React.FC<RupeeProps> = ({ isRotating, setIsRotating, ...props }) => {
  const rupeeRef = useRef<Group>(null);
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(rupeeModel) as any;  

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = useCallback(
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      lastX.current = clientX;
    },
    [setIsRotating],
  );

  const handlePointerUp = useCallback(
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(false);
    },
    [setIsRotating],
  );

  const handlePointerMove = useCallback(
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      if (isRotating && rupeeRef.current) {
        // If rotation is enabled, calculate the change in clientX position
        const clientX = e.touches
          ? e.touches[0].clientX
          : e.clientX;

        // calculate the change in the horizontal position of the mouse cursor or touch input,
        // relative to the viewport's width
        const delta = (clientX - lastX.current) / viewport.width;

        // Update the island's rotation based on the mouse/touch movement
        rupeeRef.current.rotation.y += delta * 0.01 * Math.PI;

        // Update the reference for the last clientX position
        lastX.current = clientX;

        // Update the rotation speed
        rotationSpeed.current = delta * 0.01 * Math.PI;
      }
    },
    [isRotating, viewport.width],
  );

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (rupeeRef.current) {

    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      rupeeRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = rupeeRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    }
  }});

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerout", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerout", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [
    gl,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
  ]);
  
  return (
    <a.group ref={rupeeRef} {...props} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rupee_GEO_Rupee_aiSS_0.geometry}
        material={materials.Rupee_aiSS}
        position={[0, 0, 0]}
        scale={[1, 1, 1]} 
      />
    </a.group>
  )
}

export default Rupee