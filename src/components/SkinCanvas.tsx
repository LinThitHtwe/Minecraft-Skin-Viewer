"use client";
import { SkinViewerState } from "@/types/type";
import React, { useEffect } from "react";

const NOTCHSKINURL =
	"http://textures.minecraft.net/texture/292009a4925b58f02c77dadc3ecef07ea4c7472f64e0fdc32ce5522489362680";

const SkinCanvas = ({
	skinDetails,
	isLoading,
	skinUrl,
}: {
	skinDetails: SkinViewerState;
	isLoading: boolean;
	skinUrl: string;
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
					skin: skinDetails.uploadSkin ? skinDetails.uploadSkin : skinUrl || "",
				});

				// Change viewer size
				const container = canvas.parentElement;
				if (container) {
					const { width, height } = container.getBoundingClientRect();
					skinViewer.width = width;
					skinViewer.height = height;
				}

				if (skinDetails.backgroundColor) {
					skinViewer.background = skinDetails.backgroundColor;
				}
				if (skinDetails.backgroundImage) {
					skinViewer.loadBackground(skinDetails.backgroundImage);
				}
				if (skinDetails.isPanorama) {
					skinViewer.loadPanorama(skinDetails.backgroundImage);
				}
				// Change camera FOV
				skinViewer.fov = Number(skinDetails.fov);

				// Zoom out
				skinViewer.zoom = 0.6;

				// Rotate the player
				skinViewer.autoRotate = skinDetails.shouldRotate;

				// Default animations
				let walkingAnimation = new skinview3d.WalkingAnimation();
				walkingAnimation.speed = Number(skinDetails.movementSpeed);

				let runAnimation = new skinview3d.RunningAnimation();
				runAnimation.speed = Number(skinDetails.movementSpeed);

				if (skinDetails.shouldWalk) {
					skinViewer.animation = walkingAnimation;
				} else if (skinDetails.shouldRun) {
					skinViewer.animation = runAnimation;
				} else {
					skinViewer.animation = null;
				}

				// Variables to handle dragging state
				let isDragging = false;

				if (!skinDetails.shouldAnimationPlay) {
					skinViewer.autoRotate = false;
					if (skinViewer.animation) skinViewer.animation.paused = true;
				}

				// Event listeners for dragging
				const startDragging = () => {
					isDragging = true;

					// Pause animations and disable autoRotate based on conditions
					if (skinDetails.shouldAnimationPlay && skinViewer.animation) {
						skinViewer.animation.paused = true;
					}

					if (!skinDetails.shouldRotate) {
						skinViewer.autoRotate = false;
					}

					canvas.style.cursor = "grabbing";
				};

				const stopDragging = () => {
					isDragging = false;

					// Resume animations and enable autoRotate based on conditions
					if (skinDetails.shouldAnimationPlay && skinViewer.animation) {
						skinViewer.animation.paused = false;
					}

					if (skinDetails.shouldRotate) {
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
	}, [skinUrl, isLoading, skinDetails]);

	return (
		<>
			{!isLoading ? (
				<canvas
					id="skin_container"
					className=" rounded-2xl"
					//style={{ width: "50%", height: "80%" }}
				></canvas>
			) : (
				<div className=" flex justify-center items-center h-full">
					<div className="loader"></div>
				</div>
			)}
		</>
	);
};

export default SkinCanvas;
