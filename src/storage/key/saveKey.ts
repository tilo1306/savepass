import AsyncStorage from "@react-native-async-storage/async-storage";
import { SAVE_COLLECTION } from "../storageConfig";
import { LoginDataProps } from "../../screens/Home";
import { getKey } from "./getKey";
import { log } from "react-native-reanimated";

export async function saveKey(data: LoginDataProps) {
  try {
    const storageKeys = await getKey();

    const storage = JSON.stringify([...storageKeys, data]);
    await AsyncStorage.setItem(SAVE_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
