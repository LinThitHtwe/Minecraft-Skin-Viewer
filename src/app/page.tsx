"use client";

import { getPlayerDetail } from "@/apiCalls/queryFunctions";
import SkinCanvas from "@/components/SkinCanvas";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [inputUsername, setInputUsername] = useState("Notch");
  const [searchedUsername, setSearchedUsername] = useState("");
  const [shouldAnimationPlay, setShouldAnimationPlay] = useState(true);
  const [shouldRotate, setShouldRotate] = useState(true);
  const [shouldWalk, setShouldWalk] = useState(true);
  const [shouldRun, setShouldRun] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [fov, setFov] = useState("75");
  const [movementSpeed, setMovementSpeed] = useState("0.6");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isPanorama, setIsPanorama] = useState(false);

  const handleAnimationCheckbox = () => {
    setShouldAnimationPlay(!shouldAnimationPlay);
    setShouldRotate(false);
    setShouldWalk(false);
    setShouldRun(false);
    //setMovementSpeed("0.6");
  };

  const handleWalkOrRunAnimationCheckbox = (isWalk: boolean) => {
    setShouldWalk(isWalk ? !shouldWalk : false);
    setShouldRun(!isWalk ? !shouldRun : false);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMovementSpeed(value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === "image/png") {
      const fileUrl = URL.createObjectURL(file);
      setBackgroundImage(fileUrl);
    }
  };

  const handleMovementSpeedInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!isNaN(parseFloat(value)) && value >= "0" && value <= "200") {
      setMovementSpeed(value);
    }
  };

  const searchUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedUsername(inputUsername);
  };

  const {
    data: playerDetail,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["searchedUser", searchedUsername],
    queryFn: () => getPlayerDetail(searchedUsername),
    enabled: !!searchedUsername,
  });

  return (
    <>
      <div className="grid grid-cols-2 py-6 items-stretch px-28 gap-6  ">
        <div className="border-2 rounded-2xl p-4">
          <h1 className="text-black text-3xl mb-5">Minecraft Skin Viewer</h1>
          <form onSubmit={searchUser} className="flex gap-3 flex-col mb-3">
            <input
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="border-2 tracking-normal  text-black w-full h-14 focus:outline-none py-2 px-4 rounded-lg"
              placeholder="Minecraft Username ; exp - Notch"
            />

            <div className="flex gap-3">
              <div className="">
                <label
                  className="block mb-2 text-sm  text-gray-900 "
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border p-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                  id="file_input"
                  type="file"
                />
              </div>
              <div className="">
                <p className=" mb-2 text-sm opacity-0  text-gray-900 ">
                  Upload file
                </p>
                {/* <input
                  className="block w-full text-sm text-gray-900 border p-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                  id="file_input"
                  type="file"
                /> */}
                {playerDetail?.textures?.skin?.url ? (
                  <a
                    href={playerDetail.textures.skin.url}
                    className="p-2 border-2"
                    download
                    target="_blank"
                  >
                    Download Skin
                  </a>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            {/* <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-600 font-medium mx-1 rounded-lg px-4 py-3"
          >
            Search
          </button> */}
          </form>
          <p className="text-black text-lg font-medium mb-4">Configure</p>
          <div className="mb-4 flex gap-5">
            <div className="w-fit">
              <label
                htmlFor="first_name"
                className="block w-fit mb-2 text-sm font-medium text-black"
              >
                FOV
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5"
                placeholder="John"
                value={fov}
                onChange={(e) => setFov(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="hs-color-input"
                className="block text-sm font-medium mb-2 text-black"
              >
                Background Color
              </label>
              <input
                type="color"
                className="p-1 h-10 w-10 block bg-gray-50 border border-gray-300 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                id="hs-color-input"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                title="Choose your color"
              />
            </div>
          </div>

          <label className="inline-flex font-medium border-b-2 mb-3 w-full pb-1 items-center cursor-pointer">
            <span className="text-lg mr-2 text-gray-900">Animations</span>
            <input
              type="checkbox"
              checked={shouldAnimationPlay}
              onClick={handleAnimationCheckbox}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
          <div className="flex gap-4 mb-4">
            <label
              className={`inline-flex items-center ${
                shouldAnimationPlay
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-70"
              }`}
            >
              <input
                type="checkbox"
                disabled={!shouldAnimationPlay}
                className="sr-only peer "
                onChange={() => setShouldRotate(!shouldRotate)}
                checked={shouldRotate}
              />
              <div className="relative w-11 h-6 bg-gray-200  peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2  text-sm text-gray-900">Rotate</span>
            </label>
            <label
              className={`inline-flex items-center ${
                shouldAnimationPlay
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-70"
              }`}
            >
              <input
                type="checkbox"
                disabled={!shouldAnimationPlay}
                className="sr-only peer"
                checked={shouldWalk}
                onChange={() => handleWalkOrRunAnimationCheckbox(true)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2  text-sm text-gray-900">Walk</span>
            </label>
            <label
              className={`inline-flex items-center ${
                shouldAnimationPlay
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-70"
              }`}
            >
              <input
                type="checkbox"
                disabled={!shouldAnimationPlay}
                className="sr-only peer"
                checked={shouldRun}
                onChange={() => handleWalkOrRunAnimationCheckbox(false)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2  text-sm text-gray-900">Run</span>
            </label>
          </div>
          <label
            htmlFor="minmax-range"
            className="block text-sm text-gray-900 "
          >
            Walking Speed
          </label>
          <div className="flex items-center gap-2 mb-6">
            <input
              id="minmax-range"
              type="range"
              min="0"
              max="200"
              value={movementSpeed}
              onChange={handleRangeChange}
              className="w-[80%] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="text"
              value={movementSpeed}
              onChange={handleMovementSpeedInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5"
            />
            {movementSpeed != "0.6" && (
              <button className="" onClick={() => setMovementSpeed("0.6")}>
                Reset
              </button>
            )}
          </div>

          <label className="inline-flex border-b-2 mb-3 w-full pb-1 items-center cursor-pointer">
            <span className="text-lg mr-2 text-gray-900">Background</span>
            <input
              type="checkbox"
              //checked={shouldAnimationPlay}
              //onClick={handleAnimationCheckbox}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
          <div className=" flex mb-6  gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="size-12">
                <Image
                  alt=""
                  src="/Bg.jpg"
                  className="object-cover size-full overflow-hidden"
                  width={50}
                  height={50}
                />
              </div>
            ))}

            <div className="flex items-center justify-center size-12">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center size-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {/* <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg> */}
                  {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p> */}
                  {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG (MAX. 800x400px)
                  </p> */}
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
          </div>
          <label className="inline-flex mb-6 items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setIsPanorama(!isPanorama)}
              checked={isPanorama}
              className="sr-only peer"
              disabled={backgroundImage ? false : true}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            <span className="ms-2  text-sm text-gray-900">
              Set Background as Panorama
            </span>
          </label>
          {/* <button
            type="reset"
            className="bg-slate-400 rounded-lg block w-full py-2 "
          >
            Reset
          </button> */}
        </div>

        <div className=" overflow-hidden rounded-2xl border-2">
          <SkinCanvas
            skinUrl={
              playerDetail?.textures.skin.url
                ? playerDetail?.textures.skin.url
                : ""
            }
            fov={fov}
            backgroundColor={backgroundColor}
            isLoading={isLoading}
            shouldAnimationPlay={shouldAnimationPlay}
            shouldRotate={shouldRotate}
            shouldWalk={shouldWalk}
            shouldRun={shouldRun}
            movementSpeed={movementSpeed}
            backgroundImage={backgroundImage}
            isPanorama={isPanorama}
          />
        </div>
      </div>
      <div className="text-center py-10">
        Enjoy this project ? Why not give a star on github ?
      </div>
    </>
  );
}
