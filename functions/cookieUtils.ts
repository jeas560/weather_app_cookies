import Cookies from "js-cookie";

export const getCities = (): string[] => {
  const citiesCookie = Cookies.get("cities");
  return citiesCookie ? JSON.parse(citiesCookie) : [];
};

export const addNewCity = (city: string): string => {
  const existingCities = getCities();
  if (existingCities.length >= 3) {
    return "maxcities";
  }
  if (!existingCities.includes(city)) {
    city = city.charAt(0).toUpperCase() + city.slice(1);
    existingCities.push(city);
    Cookies.set("cities", JSON.stringify(existingCities), {
      sameSite: "none",
      secure: true,
    });
  } else {
    return "false";
  }
  return "true";
};

export const removeCity = (city: string): boolean => {
  const existingCities = getCities();
  if (!existingCities.includes(city)) {
    const index = existingCities.indexOf(city);
    existingCities.splice(index, 1);
    Cookies.set("cities", JSON.stringify(existingCities), {
      sameSite: "none",
      secure: true,
    });
  } else {
    return false;
  }
  return true;
};

export default addNewCity;
