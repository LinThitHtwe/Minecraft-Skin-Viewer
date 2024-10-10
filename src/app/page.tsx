"use client";

import { getPlayerDetail } from "@/apiCalls/queryFunctions";
import SkinCanvas from "@/components/SkinCanvas";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputUsername, setInputUsername] = useState("Notch");
  const [searchedUsername, setSearchedUsername] = useState("");

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
    <div className="flex items-center justify-center px-28 gap-20 bg-white h-screen">
      <div className="border-2 py-5  flex flex-col justify-center ml-20 w-1/3 p-5 rounded-2xl">
        <h1 className="text-black text-3xl mb-5">Minecraft Skin Viewer</h1>
        <form onSubmit={searchUser} className="flex gap-3 flex-col">
          <input
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className="border-2 text-black w-full h-14 focus:outline-none py-2 px-4 rounded-lg"
            placeholder="Minecraft Username ; exp - Notch"
          />
          <button
            type="submit"
            className="bg-emerald-700 font-medium mx-1 rounded-lg px-4 py-3"
          >
            Search
          </button>
        </form>
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
