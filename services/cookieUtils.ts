import Cookies from "js-cookie";
import { validateNewCity } from "./GetWeatherData";

export const getCities = (): string[] => {
  const citiesCookie = Cookies.get("cities");
  return citiesCookie ? JSON.parse(citiesCookie) : [];
};

export const addNewCity = async (city: string): Promise<string> => {
  const existingCities = getCities();
  const dadosTemporaisApi = await validateNewCity(city);
  const cityName = dadosTemporaisApi.name;
  if (existingCities.length >= 3) {
    return "maxcities";
  }
  if (!dadosTemporaisApi) {
    return "notfound";
  }
  if (!existingCities.includes(cityName)) {
    existingCities.push(cityName);
    Cookies.set("cities", JSON.stringify(existingCities), {
      sameSite: "none",
      secure: true,
      expires: 365,
    });
  } else {
    return "false";
  }
  return "true";
};

export const removeCity = (index: number): boolean => {
  const existingCities = getCities();
  existingCities.splice(index, 1);
  Cookies.set("cities", JSON.stringify(existingCities), {
    sameSite: "none",
    secure: true,
  });
  return true;
};
