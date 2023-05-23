import AsyncStorage from "@react-native-async-storage/async-storage";
import { SAVE_COLLECTION } from "../storageConfig";
import { LoginListDataProps } from "../../screens/Home";

export async function getKey() {
  try {
    const storage = await AsyncStorage.getItem(SAVE_COLLECTION);

    const key = storage ? JSON.parse(storage) : ([] as LoginListDataProps);

    return key;
  } catch (error) {
    throw error;
  }
}
