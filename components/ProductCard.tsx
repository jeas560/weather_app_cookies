import { useEffect, useState } from "react";
import Image from "next/image";
import GetWeatherData from "../services/GetWeatherData";
import CloseIcon from "./CloseIcon";

async function fetchWeatherData(nomeCidade: string) {
  try {
    const response = await GetWeatherData(nomeCidade);
    return response;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

function ProductCard({
  nomeCidade,
  index,
  refreshCities,
}: {
  nomeCidade: string;
  index: number;
  refreshCities: VoidFunction;
}) {
  const [weatherData, setWeatherData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData(nomeCidade);
      setWeatherData(data);
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 100000);

    return () => {
      clearInterval(intervalId);
    };
  }, [nomeCidade]);

  const isLoading = weatherData === null;

  return (
    <div className="w-5/6 max-w-lg mx-auto">
      <section className="border border-gray-300 bg-white rounded-lg shadow-lg mt-8 w-full hover:shadow-2xl transition pt-2 relative">
        <div className="p-4 flex flex-col justify-center items-center border-b">
          <div className="flex justify-between w-full items-baseline">
            <div className="ml-3 lg:ml-10">
              <Image
                className="pointer-events-none"
                alt="Image"
                src={
                  isLoading
                    ? ``
                    : `http://openweathermap.org/img/w/${weatherData.icon}.png`
                }
                width="50"
                height="50"
              />
            </div>
            <div className="ml-4 mr-auto text-left flex flex-col">
              <h2 className="font-semibold text-2xl">
                {isLoading ? `` : `${weatherData.city}`}
              </h2>
              <h3 className="text-gray-700">
                {isLoading ? `` : `${weatherData.description}`}
              </h3>
            </div>
            <h2 className="font-bold text-3xl mr-5 lg:mr-10">
              {isLoading ? `` : `${weatherData.temperature} C`}
            </h2>
          </div>
        </div>
        <CloseIcon index={index} refreshCities={refreshCities} />
      </section>
    </div>
  );
}
export default ProductCard;
