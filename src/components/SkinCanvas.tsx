"use client";
import React, { useEffect } from "react";

const NOTCHSKINURL =
  "http://textures.minecraft.net/texture/292009a4925b58f02c77dadc3ecef07ea4c7472f64e0fdc32ce5522489362680";

const SkinCanvas = ({
  skinUrl,
  isLoading,
}: {
  skinUrl: string;
  isLoading: boolean;
}) => {
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      const skinview3d = require("skinview3d");

      const canvas = document.getElementById("skin_container");
      if (canvas) {
        const skinViewer = new skinview3d.SkinViewer({
          canvas: canvas,
          width: 200,
          height: 100,
          skin: skinUrl || NOTCHSKINURL,
        });

        // Change viewer size
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        skinViewer.width = 500;
        skinViewer.height = screenHeight;

        // Set the background color
        skinViewer.background = "white";

        // Change camera FOV
        skinViewer.fov = 75;

        // Zoom out
        skinViewer.zoom = 0.6;

        // Rotate the player
        skinViewer.autoRotate = true;

        // Apply a walking animation
        let walkingAnimation = new skinview3d.WalkingAnimation();
        skinViewer.animation = walkingAnimation;
        walkingAnimation.speed = 0.5;

        // Variables to handle dragging state
        let isDragging = false;

        // Event listeners for dragging
        const startDragging = () => {
          isDragging = true;
          skinViewer.autoRotate = false;
          skinViewer.animation.paused = true;
          canvas.style.cursor = "grabbing";
        };

        const stopDragging = () => {
          if (isDragging) {
            isDragging = false;
            skinViewer.autoRotate = true;
            skinViewer.animation.paused = false;
            canvas.style.cursor = "grab";
          }
        };

        canvas.addEventListener("mousedown", startDragging);
        canvas.addEventListener("mouseup", stopDragging);

        return () => {
          canvas.removeEventListener("mousedown", startDragging);
          canvas.removeEventListener("mouseup", stopDragging);
        };
      }
    }
  }, [skinUrl, isLoading]);

  return (
    <>
      {!isLoading ? (
        <canvas
          id="skin_container"
          className=""
          style={{ width: "50%", height: "80%" }}
        ></canvas>
      ) : (
        <div className="text-4xl text-black">Loading...</div>
      )}
    </>
  );
};

export default SkinCanvas;
