import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const storeData = async (value, key) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("value", value);
  } catch (e) {
    // saving error
    console.error(`Errore durante il salvataggio del dato con chiave "${key}":`, e);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== undefined || value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
    console.error(`Errore durante la lettura del dato con chiave "${key}":`, e);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Dato con chiave "${key}" rimosso con successo.`);
  } catch (error) {
    console.error(`Errore durante la rimozione del dato con chiave "${key}":`, error);
  }
};

const loginUserSavedData = async (setUser, setIdUser, setIsLoggedIn) => {
  try {
    const userDataSaved = await getData("userSavedData");
    console.log("userDataSaved", userDataSaved);
    if (userDataSaved) {
      const userData = JSON.parse(userDataSaved);
      console.log("userData", userData);
      const response = await axios.get("http://gnammy.mywire.org:9710/login", {
        params: {
          email: userData.email,
          password: userData.password,
        },
      });

      if (response.status === 200) {
        const { data } = response;
        data.favouriteRecipes = parseAndFilterArray(data.favouriteRecipes);
        data.createdRecipes = parseAndFilterArray(data.createdRecipes);

        setUser(data);
        setIdUser(data.id);
        setIsLoggedIn(true);
      } else {
        displayErrorMessage("Sessione terminata");
      }
    } else {
      console.log("userDataSaved is undefined");
    }
  } catch (error) {
    displayErrorMessage("Errore durante l'autenticazione", error);
  }
};

const parseAndFilterArray = (str) => {
  if (!str) return [];
  
  return str
    .slice(1, -1) // Rimuovi le virgole iniziali e finali
    .split(",") // Dividi la stringa utilizzando la virgola come delimitatore
    .map((item) => parseInt(item)) // Converti le sottostringhe in numeri interi
    .filter((num) => !isNaN(num)); // Rimuovi gli elementi vuoti (isNaN restituisce true per elementi non numerici)
};

const displayErrorMessage = (message) => {
  console.error(message);
};


export { storeData, getData, removeData, loginUserSavedData };
