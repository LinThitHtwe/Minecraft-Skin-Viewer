"use client";

import { getPlayerDetail } from "@/apiCalls/queryFunctions";
import SkinCanvas from "@/components/SkinCanvas";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputUsername, setInputUsername] = useState("Notch");
  const [searchedUsername, setSearchedUsername] = useState("");
  const [shouldAnimationPlay, setShouldAnimationPlay] = useState(true);
  const [shouldWalk, setShouldWalk] = useState(true);

  const handleAnimationCheckbox = () => {
    setShouldAnimationPlay(!shouldAnimationPlay);
  };

  const handleWalkAnimationCheckbox = () => {};

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
      <div className="grid grid-cols-2 py-10 items-stretch px-28 gap-6  ">
        <div className="border-2 rounded-2xl p-4">
          <h1 className="text-black text-3xl mb-5">Minecraft Skin Viewer</h1>
          <form onSubmit={searchUser} className="flex gap-3 flex-col mb-3">
            <input
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="border-2 tracking-normal  text-black w-full h-14 focus:outline-none py-2 px-4 rounded-lg"
              placeholder="Minecraft Username ; exp - Notch"
            />

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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5" // Adjusted width to w-20
                placeholder="John"
                value={75}
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
                className="p-1 h-10 w-10 block bg-gray-100 border border-gray-300 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none "
                id="hs-color-input"
                value="#2563eb"
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
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2  text-sm text-gray-900">Rotate</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2  text-sm text-gray-900">Walk</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
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
              max="100"
              value="5"
              className="w-[80%] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="text"
              className=" border-2 w-8 h-6 rounded-md text-black px-2 py-1"
            />
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
          </div>
          <label className="inline-flex mb-6 items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
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
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="text-center">
        {" "}
        Enjoy this project ? Why not give a star on github ?
      </div>
    </>
  );
}
