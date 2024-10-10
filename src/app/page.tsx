"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const skinview3d = require("skinview3d");

      const skinViewer = new skinview3d.SkinViewer({
        canvas: document.getElementById("skin_container"),
        width: 200,
        height: 100,
        skin: "ivan_kelovic.png",
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

      //skinViewer.cameraLight.intensity = 1;
      //skinViewer.globalLight.intensity = 1;

      // Apply a walking animation
      let walkingAnimation = new skinview3d.WalkingAnimation();
      skinViewer.animation = walkingAnimation;
      // skinViewer.nameTag = "hello";
      // Set the speed of the animation
      walkingAnimation.speed = 0.5;

      // Variables to handle dragging state
      let isDragging = false;

      const canvas = document.getElementById("skin_container")!;

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

      const onMouseMove = (event) => {
        if (isDragging) {
          // Additional logic during dragging can go here
        }
      };

      // Attach mouse event listeners to the canvas
      canvas.addEventListener("mousedown", startDragging);
      canvas.addEventListener("mouseup", stopDragging);
      // canvas.addEventListener("mousemove", onMouseMove);

      // Set the cursor to grab when hovering over the canvas
      canvas.style.cursor = "grab";

      return () => {
        canvas.removeEventListener("mousedown", startDragging);
        canvas.removeEventListener("mouseup", stopDragging);
        canvas.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, []);

  return (
    <div className="flex items-center justify-center px-28 gap-20 bg-white h-screen">
      <div className="border-2 py-5  flex flex-col justify-center ml-20 w-1/3 p-5 rounded-2xl">
        <h1 className="text-black text-3xl mb-5">Minecraft Skin Viewer</h1>
        <div className="flex gap-3 flex-col">
          <input
            className="border-2 text-black w-full h-14 focus:outline-none py-2 px-4 rounded-lg"
            placeholder="Minecraft Username ; exp - Notch"
          />
          <button className="bg-emerald-700 font-medium mx-1 rounded-lg px-4 py-3">
            Search
          </button>
        </div>
      </div>
      <canvas
        id="skin_container"
        className=""
        style={{ width: "50%", height: "80%" }}
        //className="w-1/2 h-full"
      ></canvas>
    </div>
  );
}
