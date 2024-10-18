"use client";
import React, { useEffect } from "react";

const NOTCHSKINURL =
  "http://textures.minecraft.net/texture/292009a4925b58f02c77dadc3ecef07ea4c7472f64e0fdc32ce5522489362680";

const SkinCanvas = ({
  skinUrl,
  isLoading,
  backgroundColor,
  fov,
  shouldAnimationPlay,
  shouldRotate,
  shouldWalk,
  shouldRun,
  movementSpeed,
  backgroundImage,
  isPanorama,
}: {
  skinUrl: string;
  isLoading: boolean;
  backgroundColor: string;
  fov: string;
  shouldAnimationPlay: boolean;
  shouldRotate: boolean;
  shouldWalk: boolean;
  shouldRun: boolean;
  movementSpeed: string;
  backgroundImage: string | null;
  isPanorama: boolean;
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

        // Set the background color
        skinViewer.background = backgroundColor;
        if (backgroundImage) {
          skinViewer.loadBackground(backgroundImage);
        }
        if (isPanorama) {
          skinViewer.loadPanorama(backgroundImage);
        }
        // Change camera FOV
        skinViewer.fov = Number(fov);

        // Zoom out
        skinViewer.zoom = 0.6;

        // Rotate the player
        skinViewer.autoRotate = shouldRotate;

        // Default animations
        let walkingAnimation = new skinview3d.WalkingAnimation();
        walkingAnimation.speed = Number(movementSpeed);

        let runAnimation = new skinview3d.RunningAnimation();
        runAnimation.speed = Number(movementSpeed);

        if (shouldWalk) {
          skinViewer.animation = walkingAnimation;
        } else if (shouldRun) {
          skinViewer.animation = runAnimation;
        } else {
          skinViewer.animation = null;
        }

        // Variables to handle dragging state
        let isDragging = false;

        if (!shouldAnimationPlay) {
          skinViewer.autoRotate = false;
          if (skinViewer.animation) skinViewer.animation.paused = true;
        }

        // Event listeners for dragging
        const startDragging = () => {
          isDragging = true;

          // Pause animations and disable autoRotate based on conditions
          if (shouldAnimationPlay && skinViewer.animation) {
            skinViewer.animation.paused = true;
          }

          if (!shouldRotate) {
            skinViewer.autoRotate = false;
          }

          canvas.style.cursor = "grabbing";
        };

        const stopDragging = () => {
          isDragging = false;

          // Resume animations and enable autoRotate based on conditions
          if (shouldAnimationPlay && skinViewer.animation) {
            skinViewer.animation.paused = false;
          }

          if (shouldRotate) {
            skinViewer.autoRotate = true;
          }

          canvas.style.cursor = "grab";
        };

        canvas.addEventListener("mousedown", startDragging);
        canvas.addEventListener("mouseup", stopDragging);

        return () => {
          canvas.removeEventListener("mousedown", startDragging);
          canvas.removeEventListener("mouseup", stopDragging);
        };
      }
    }
  }, [
    skinUrl,
    isLoading,
    backgroundColor,
    fov,
    shouldAnimationPlay,
    shouldRotate,
    shouldWalk,
    shouldRun,
    movementSpeed,
    backgroundImage,
    isPanorama,
  ]);

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
