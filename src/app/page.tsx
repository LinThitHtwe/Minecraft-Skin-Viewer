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

  const handleAnimationCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShouldAnimationPlay(event.target.checked);
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
    <div className="flex items-center justify-center px-28 gap-20  h-screen">
      <div className="border-2 py-5 flex flex-col justify-center ml-20 w-1/2 p-5 rounded-2xl">
        <h1 className="text-black text-3xl mb-5">Minecraft Skin Viewer</h1>
        <form onSubmit={searchUser} className="flex gap-3 flex-col mb-5">
          <input
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className="border-2 tracking-normal  text-black w-full h-14 focus:outline-none py-2 px-4 rounded-lg"
            placeholder="Minecraft Username ; exp - Notch"
          />

          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-600 font-medium mx-1 rounded-lg px-4 py-3"
          >
            Search
          </button>
        </form>
        <p className="text-black text-lg font-medium mb-4">Configure</p>
        <p className="text-black">Animations</p>
        <div className="border-t-2 pt-4 flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2  text-sm text-gray-900">Animations</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2  text-sm text-gray-900">Rotate</span>
            </label>
          </div>
          <div className="felx flex-col gap-4 ">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2  text-sm text-gray-900">Walk</span>
            </label>
            <div>
              <label
                htmlFor="minmax-range"
                className="block text-sm  text-gray-900 "
              >
                Walking Speed
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="minmax-range"
                  type="range"
                  min="0"
                  max="100"
                  value="5"
                  className="w-[18rem] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="text"
                  className=" border-2 w-8 h-6 rounded-md text-black px-2 py-1"
                />
              </div>
              {/* <label
                htmlFor="minmax-range"
                className="block mb-2 text-sm  text-gray-900 "
              >
                Walking Speed
              </label> */}
            </div>
          </div>
          <div className="felx flex-col gap-4 ">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ms-2  text-sm text-gray-900">Run</span>
            </label>
            <div>
              <label
                htmlFor="minmax-range"
                className="block text-sm  text-gray-900 "
              >
                Running Speed
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="minmax-range"
                  type="range"
                  min="0"
                  max="100"
                  value="5"
                  className="w-[18rem] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="text"
                  className=" border-2 w-8 h-6 rounded-md text-black px-2 py-1"
                />
              </div>
              {/* <label
                htmlFor="minmax-range"
                className="block mb-2 text-sm  text-gray-900 "
              >
                Walking Speed
              </label> */}
            </div>
          </div>
        </div>
        <p className="text-black">Backgrounds</p>
        <div className="border-t-2 pt-4 flex  gap-2">
          <div className="size-12">
            <Image
              alt=""
              src={"/Bg.jpg"}
              className="object-cover size-full overflow-hidden"
              width={50}
              height={50}
            />
          </div>
          <div className="size-12">
            <Image
              alt=""
              src={"/Bg.jpg"}
              className="object-cover size-full overflow-hidden"
              width={50}
              height={50}
            />
          </div>
          <div className="size-12">
            <Image
              alt=""
              src={"/Bg.jpg"}
              className="object-cover size-full overflow-hidden"
              width={50}
              height={50}
            />
          </div>
          <div className="size-12">
            <Image
              alt=""
              src={"/Bg.jpg"}
              className="object-cover size-full overflow-hidden"
              width={50}
              height={50}
            />
          </div>
          <div className="size-12 overflow-hidden">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
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
                  </svg>
                  {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p> */}
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
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
  );
}
