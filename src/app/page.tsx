"use client";

import { getPlayerDetail } from "@/apiCalls/queryFunctions";
import SkinCanvas from "@/components/SkinCanvas";
import Delete02Icon from "@/icons/delete.icon";
import Download04Icon from "@/icons/download.icon";
import { SkinViewerState } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const defaultViewerState: SkinViewerState = {
	inputUsername: "Notch",
	searchedUsername: "Notch",
	shouldAnimationPlay: true,
	shouldRotate: true,
	shouldWalk: true,
	shouldRun: false,
	backgroundColor: "",
	fov: "75",
	movementSpeed: "0.6",
	backgroundImage: null,
	shouldBackgroundAppear: false,
	isPanorama: false,
	uploadSkin: null,
};

export default function Home() {
	const uploadSkinInputRef = useRef<HTMLInputElement>(null);
	const inputUsernameRef = useRef<HTMLInputElement>(null);
	const [viewerState, setViewerState] =
		useState<SkinViewerState>(defaultViewerState);
	const [showResetButton, setShowResetButton] = useState(false);

	useEffect(() => {
		const hasChanges = Object.entries(defaultViewerState).some(
			([key, defaultValue]) => {
				return viewerState[key as keyof SkinViewerState] !== defaultValue;
			}
		);

		setShowResetButton(hasChanges);
	}, [viewerState]);

	useEffect(() => {
		if (!viewerState.shouldBackgroundAppear) {
			removeUploadedBackground();
		}
	}, [viewerState.shouldBackgroundAppear]);

	const resetStates = () => {
		setViewerState((prev) => ({
			...prev,
			inputUsername: "Notch",
			searchedUsername: "Notch",
			shouldAnimationPlay: true,
			shouldRotate: true,
			shouldWalk: true,
			shouldRun: false,
			backgroundColor: "",
			fov: "75",
			movementSpeed: "0.6",
			backgroundImage: null,
			shouldBackgroundAppear: false,
			isPanorama: false,
			uploadSkin: null,
		}));
		if (inputUsernameRef.current) {
			inputUsernameRef.current.value = "Notch";
		}
	};

	const handleAnimationCheckbox = () => {
		setViewerState((prev) => ({
			...prev,
			shouldAnimationPlay: !prev.shouldAnimationPlay,
			shouldRotate: false,
			shouldWalk: false,
			shouldRun: false,
		}));
	};

	const handleWalkOrRunAnimationCheckbox = (isWalk: boolean) => {
		setViewerState((prev) => ({
			...prev,
			shouldWalk: isWalk ? !prev.shouldWalk : false,
			shouldRun: !isWalk ? !prev.shouldRun : false,
		}));
	};

	const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setViewerState((prev) => ({
			...prev,
			movementSpeed: value,
		}));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type === "image/png") {
			const fileUrl = URL.createObjectURL(file);
			setViewerState((prev) => ({
				...prev,
				backgroundImage: fileUrl,
			}));
		}
	};

	const handleUploadSkin = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file && file.type === "image/png") {
			const reader = new FileReader();

			reader.onload = (e) => {
				const img = document.createElement("img");
				img.src = e.target?.result as string;

				img.onload = () => {
					const width = img.naturalWidth;
					const height = img.naturalHeight;

					const isValidSkinSize =
						(width === 64 && height === 64) || (width === 64 && height === 32);

					if (isValidSkinSize) {
						setViewerState((prev) => ({
							...prev,
							uploadSkin: img.src,
							inputUsername: "",
						}));
					} else {
						toast.error(
							` Invalid skin size: ${width}x${height}. Must be 64x64 or 64x32.`
						);
						if (uploadSkinInputRef.current) {
							uploadSkinInputRef.current.value = "";
						}
					}
				};

				img.onerror = () => {
					toast.error(
						"⚠️ Unable to load the image. Please try another PNG file."
					);
					if (uploadSkinInputRef.current) {
						uploadSkinInputRef.current.value = "";
					}
				};
			};

			reader.readAsDataURL(file);
		} else {
			toast.error("📁 Please upload a valid PNG image.");
			if (uploadSkinInputRef.current) {
				uploadSkinInputRef.current.value = "";
			}
		}
	};

	const handleMovementSpeedInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		if (!isNaN(parseFloat(value)) && value >= "0" && value <= "200") {
			setViewerState((prev) => ({
				...prev,
				movementSpeed: value,
			}));
		}
	};

	const handleDownloadSkin = async () => {
		const rawSkinUrl = playerDetail?.textures.skin.url;
		if (!rawSkinUrl) return;

		const skinUrl = rawSkinUrl.replace(/^http:/, "https:");

		try {
			const response = await fetch(skinUrl);
			const blob = await response.blob();

			const url = URL.createObjectURL(blob);
			const fileName = viewerState.searchedUsername
				? `${viewerState.searchedUsername}-skin.png`
				: "minecraft-skin.png";
			const link = document.createElement("a");
			link.href = url;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			URL.revokeObjectURL(url);
		} catch (error) {
			toast.error("Unable to download the skin. Please try again later.");
		}
	};

	const searchUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const inputUsername = inputUsernameRef.current?.value?.trim();
		if (!inputUsername) return;

		if (uploadSkinInputRef.current) {
			uploadSkinInputRef.current.value = "";
		}
		setViewerState((prev) => ({
			...prev,
			uploadSkin: null,
			searchedUsername: inputUsername,
		}));
	};

	const removeUploadedSkin = () => {
		if (uploadSkinInputRef.current) {
			uploadSkinInputRef.current.value = "";
		}
		setViewerState((prev) => ({
			...prev,
			uploadSkin: null,
		}));
	};

	const removeUploadedBackground = () => {
		setViewerState((prev) => ({
			...prev,
			backgroundImage: null,
			isPanorama: false,
		}));
	};

	const {
		data: playerDetail,
		//error,
		isLoading,
	} = useQuery({
		queryKey: ["searchedUser", viewerState.searchedUsername],
		queryFn: () => getPlayerDetail(viewerState.searchedUsername),
		enabled: !!viewerState.searchedUsername,
	});

	return (
		<>
			<div className="grid  lg:grid-cols-2 py-6 items-stretch px-4 text-text-primary lg:px-10 xl:px-28 gap-6  ">
				<div className="border-2 border-card-border bg-card-background rounded-2xl p-4">
					<h1 className="text-text-primary text-3xl mb-5">
						Minecraft Skin Viewer
					</h1>
					<form onSubmit={searchUser} className="flex gap-3 flex-col mb-3">
						<label className="block text-sm  " htmlFor="file_input">
							Search username
						</label>
						<div className="relative w-full">
							<input
								defaultValue={defaultViewerState.inputUsername}
								ref={inputUsernameRef}
								className="border-2 border-card-border bg-background tracking-normal w-full h-14 focus:outline-none py-2 pr-14 pl-4 rounded-lg"
								placeholder="Minecraft Username ; exp - Notch"
							/>

							<button
								type="submit"
								className="absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-btn-primary  px-3 py-1.5 rounded-md hover:bg-primary/90 transition">
								Search
							</button>
						</div>
						<div className="relative">
							<div className="absolute -top-2 w-full flex justify-center text-sm">
								<p className="text-center bg-card-background px-4 w-fit">or</p>
							</div>
							<div className="border border-card-border  "></div>
						</div>

						<div className="w-full relative">
							<label className="block mb-2 text-sm   " htmlFor="file_input">
								Upload Skin File
							</label>
							<input
								className="block w-full text-sm  border p-2 border-card-border rounded-lg cursor-pointer bg-background focus:outline-none "
								id="file_input"
								type="file"
								accept="image/png"
								onChange={handleUploadSkin}
								ref={uploadSkinInputRef}
							/>
							{viewerState.uploadSkin && (
								<button
									onClick={removeUploadedSkin}
									className="absolute right-4  top-[55%]">
									<Delete02Icon
										svgProps={{ className: "size-5", fill: "none" }}
										strokeWidth="1.7"
									/>
								</button>
							)}
						</div>
					</form>
					<p className=" text-lg border-b border-card-border pb-1 font-medium mb-4">
						Configure
					</p>
					<div className="mb-4 flex gap-5">
						<div className="w-fit">
							<label
								htmlFor="fov"
								className="block w-fit mb-2 text-sm font-medium ">
								FOV
							</label>
							<input
								type="text"
								id="fov"
								className="bg-gray-50 border focus:outline-none  border-gray-300  text-sm rounded-lg focus:ring-btn-primary focus:border-btn-primary block w-20 p-2.5"
								placeholder="75"
								value={viewerState.fov}
								onChange={(e) =>
									setViewerState((prev) => ({
										...prev,
										fov: e.target.value,
									}))
								}
							/>
						</div>
						<div>
							<label
								htmlFor="hs-color-input"
								className="block text-sm font-medium mb-2 ">
								Background Color
							</label>
							<input
								type="color"
								className="p-1 h-10 w-10 block bg-gray-50 border border-gray-300 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
								id="hs-color-input"
								value={viewerState.backgroundColor}
								onChange={(e) =>
									setViewerState((prev) => ({
										...prev,
										backgroundColor: e.target.value,
									}))
								}
								title="Choose your color"
							/>
						</div>
					</div>

					<label className="inline-flex font-medium border-b-2 border-card-border mb-3 w-full pb-1 items-center cursor-pointer">
						<span className="text-lg mr-2 ">Animations</span>
						<input
							type="checkbox"
							checked={viewerState.shouldAnimationPlay}
							onClick={handleAnimationCheckbox}
							className="sr-only peer"
						/>
						<div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-peer-focus-ring rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-btn-primary"></div>
					</label>
					<div className="flex gap-4 mb-4">
						<label
							className={`inline-flex items-center ${
								viewerState.shouldAnimationPlay
									? "cursor-pointer"
									: "cursor-not-allowed opacity-70"
							}`}>
							<input
								type="checkbox"
								disabled={!viewerState.shouldAnimationPlay}
								className="sr-only peer "
								onChange={() =>
									setViewerState((prev) => ({
										...prev,
										shouldRotate: !prev.shouldRotate,
									}))
								}
								checked={viewerState.shouldRotate}
							/>
							<div className="relative w-11 h-6 bg-gray-300  peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-peer-focus-ring rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-btn-primary"></div>

							<span className="ms-2  text-sm ">Rotate</span>
						</label>
						<label
							className={`inline-flex items-center ${
								viewerState.shouldAnimationPlay
									? "cursor-pointer"
									: "cursor-not-allowed opacity-70"
							}`}>
							<input
								type="checkbox"
								disabled={!viewerState.shouldAnimationPlay}
								className="sr-only peer"
								checked={viewerState.shouldWalk}
								onChange={() => handleWalkOrRunAnimationCheckbox(true)}
							/>
							<div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-peer-focus-ring rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-btn-primary"></div>
							<span className="ms-2  text-sm ">Walk</span>
						</label>
						<label
							className={`inline-flex items-center ${
								viewerState.shouldAnimationPlay
									? "cursor-pointer"
									: "cursor-not-allowed opacity-70"
							}`}>
							<input
								type="checkbox"
								disabled={!viewerState.shouldAnimationPlay}
								className="sr-only peer"
								checked={viewerState.shouldRun}
								onChange={() => handleWalkOrRunAnimationCheckbox(false)}
							/>
							<div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-peer-focus-ring rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-btn-primary"></div>
							<span className="ms-2  text-sm ">Run</span>
						</label>
					</div>
					<label htmlFor="minmax-range" className="block text-sm  ">
						{viewerState.shouldWalk
							? "Walking"
							: viewerState.shouldRun
							? "Running"
							: "Movement"}{" "}
						Speed
					</label>
					<div className="flex items-center gap-2 mb-6">
						<input
							id="minmax-range"
							type="range"
							min="0"
							max="200"
							value={viewerState.movementSpeed}
							onChange={handleRangeChange}
							className="w-[80%] h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
						/>
						<input
							type="text"
							value={viewerState.movementSpeed}
							onChange={handleMovementSpeedInputChange}
							className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:outline-none focus:ring-btn-primary focus:border-btn-primary block w-14 p-2.5"
						/>
						{viewerState.movementSpeed != "0.6" && (
							<button
								className="bg-btn-primary rounded-lg px-4 py-2 "
								onClick={() =>
									setViewerState((prev) => ({ ...prev, movementSpeed: "0.6" }))
								}>
								Reset
							</button>
						)}
					</div>

					<label
						className={`inline-flex  ${
							viewerState.shouldBackgroundAppear ? "border-b-2" : ""
						} border-card-border mb-3 w-full pb-1 items-center cursor-pointer`}>
						<span className="text-lg mr-2 ">Background</span>
						<input
							type="checkbox"
							checked={viewerState.shouldBackgroundAppear}
							onClick={() =>
								setViewerState((prev) => ({
									...prev,
									shouldBackgroundAppear: !prev.shouldBackgroundAppear,
								}))
							}
							className="sr-only peer"
						/>
						<div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-peer-focus-ring rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-btn-primary"></div>
					</label>
					{viewerState.shouldBackgroundAppear && (
						<>
							<div className=" flex mb-6  gap-2">
								{["/Bg.jpg", "/Bg2.jpg", "/Bg3.jpg", "/Bg4.jpg"].map(
									(bgImage) => (
										<div className="size-12" key={bgImage}>
											<Image
												alt="Minecraft Background"
												src={bgImage}
												className="object-cover size-full overflow-hidden cursor-pointer rounded-lg"
												width={50}
												height={50}
												onClick={() =>
													setViewerState((prev) => ({
														...prev,
														backgroundImage: bgImage,
													}))
												}
											/>
										</div>
									)
								)}

								<div className="flex items-center justify-center size-12">
									<label
										htmlFor="dropzone-file"
										className="flex flex-col items-center justify-center size-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
										<div className="flex flex-col items-center justify-center pt-5 pb-6">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
												color="#000000"
												fill="none">
												<path
													d="M12 5L12 15M12 5C11.2998 5 9.99153 6.9943 9.5 7.5M12 5C12.7002 5 14.0085 6.9943 14.5 7.5"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"></path>
												<path
													d="M5 19H19.0001"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"></path>
											</svg>
										</div>
										<input
											id="dropzone-file"
											type="file"
											accept="image/png"
											onChange={handleFileChange}
											className="hidden"
										/>
									</label>
								</div>
								<div className="flex items-center justify-center size-12">
									{viewerState.backgroundImage && (
										<button
											onClick={removeUploadedBackground}
											className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2">
											<Delete02Icon
												svgProps={{ className: "size-5", fill: "none" }}
												strokeWidth="1.6"
											/>
										</button>
									)}
								</div>
							</div>
							<label className="inline-flex mb-6 items-center cursor-pointer">
								<input
									type="checkbox"
									onChange={() =>
										setViewerState((prev) => ({
											...prev,
											isPanorama: !prev.isPanorama,
										}))
									}
									checked={viewerState.isPanorama}
									className="sr-only peer"
									disabled={viewerState.backgroundImage ? false : true}
								/>
								<div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-peer-focus-ring rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-btn-primary"></div>
								<span className="ms-2  text-sm ">
									Set Background as Panorama
								</span>
							</label>
						</>
					)}
					{showResetButton && (
						<button
							onClick={resetStates}
							type="reset"
							className="bg-btn-primary rounded-lg block w-full  py-2 ">
							Reset
						</button>
					)}
				</div>

				<div className=" overflow-hidden h-screen relative lg:h-full rounded-2xl border-[#cbe9ad] bg-[#e4f4d3] border-2">
					<SkinCanvas
						skinUrl={
							playerDetail?.textures.skin.url
								? playerDetail?.textures.skin.url
								: ""
						}
						skinDetails={viewerState}
						isLoading={isLoading}
					/>
					{playerDetail?.textures.skin.url && (
						<button
							// href={playerDetail?.textures.skin.url}
							// download="minecraft-skin.png"
							onClick={handleDownloadSkin}
							className="absolute right-5 bottom-5 z-10 bg-peer-focus-ring rounded-xl p-2 cursor-pointer">
							<Download04Icon
								svgProps={{
									className: "size-8 text-text-primary",
									fill: "none",
								}}
								strokeWidth="1.7"
							/>
						</button>
					)}
				</div>
			</div>
			<div className="flex justify-center items-center py-10 ">
				<Link
					href={"https://github.com/LinThitHtwe/Minecraft-Skin-Viewer"}
					target="_blank">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						color="#8ac754"
						className="size-6"
						fill="none">
						<path
							d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z"
							stroke="#8ac754"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</Link>
			</div>
		</>
	);
}
