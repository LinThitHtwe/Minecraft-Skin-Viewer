"use client";
import React, { useEffect } from "react";

const NOTCHSKINURL =
  "http://textures.minecraft.net/texture/292009a4925b58f02c77dadc3ecef07ea4c7472f64e0fdc32ce5522489362680";

const SkinCanvas = ({
  skinUrl,
  isLoading,
  backgroundColor,
  fov,
}: {
  skinUrl: string;
  isLoading: boolean;
  backgroundColor: string;
  fov: string;
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
        const container = canvas.parentElement;
        if (container) {
          const { width, height } = container.getBoundingClientRect();
          skinViewer.width = width;
          skinViewer.height = height;
        }
        //skinViewer.loadSkin("ivan_kelovic.png");
        // Set the background color
        skinViewer.background = backgroundColor;

        // Change camera FOV
        skinViewer.fov = Number(fov);

        // Zoom out
        skinViewer.zoom = 0.6;

        // Rotate the player

        skinViewer.autoRotate = true;
        //skinViewer.loadBackground("Bg.jpg");
        //skinViewer.loadPanorama("Bg.jpg");
        // Apply a walking animation
        let walkingAnimation = new skinview3d.WalkingAnimation();
        skinViewer.animation = walkingAnimation;
        walkingAnimation.speed = 0.5;

        // let run = new skinview3d.RunningAnimation();
        // skinViewer.animation = run;
        // run.speed = 200;

        // Set the speed of an animation
        // run.speed = 3;

        // Variables to handle dragging state
        let isDragging = false;

        // if (true) {
        //   skinViewer.autoRotate = false;
        //   skinViewer.animation.paused = true;
        // }

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
  }, [skinUrl, isLoading, backgroundColor, fov]);

  return (
    <>
      {!isLoading ? (
        <canvas
          id="skin_container"
          className=" rounded-2xl"
          //style={{ width: "50%", height: "80%" }}
        ></canvas>
      ) : (
        <div className="text-4xl text-black">Loading...</div>
      )}
    </>
  );
};

export default SkinCanvas;
