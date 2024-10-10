import { MinecraftUserDetail } from "@/types/type";
import axios from "axios";
//import MinecraftUser from "../types/type/"

const BASEURL = "https://api.ashcon.app/mojang/v2/user";

export const getPlayerDetail = async (
  username: string
): Promise<MinecraftUserDetail | null> => {
  try {
    console.log("called");
    const response = await axios.get<MinecraftUserDetail>(
      `${BASEURL}/${username}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching player data:", error);
    return null;
  }
};
