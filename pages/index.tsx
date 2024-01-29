import Image from "next/image";
import { Text, Page, Link } from "@vercel/examples-ui";
import { useEffect, useState } from "react";
import { getCities, addNewCity } from "../services/cookieUtils";
import GetWeatherData from "../services/GetWeatherData";
import CloseIcon from "../components/CloseIcon";

function AddCity({ refreshCities }: { refreshCities: VoidFunction }) {
  const [isAdded, toggleAdded] = useState<boolean>(false);
  const [newcity, setNewcity] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isAdded) {
      if (newcity.length === 0) {
        alert("O campo precisa ser preenchido");
        toggleAdded(false);
        return;
      }
      try {
        if (addNewCity(newcity) === "true") {
          setNewcity("");
          refreshCities();
        } else if (addNewCity(newcity) === "false") {
          alert("Cidade já adicionada anteriormente");
          toggleAdded(false);
          return;
        } else if (addNewCity(newcity) === "maxcities") {
          alert("Número máximo de cidades alcançado no modo free!");
          toggleAdded(false);
          return;
        }
      } catch (error) {
        console.error("Error adding city:", error);
      } finally {
        timeout = setTimeout(() => toggleAdded(false), 1500);
      }
    }
    return () => clearTimeout(timeout);
  }, [isAdded]);

  return (
    <div className="w-5/6 max-w-lg mx-auto">
      <section className="border border-gray-300 bg-white rounded-lg shadow-lg mt-16 w-full hover:shadow-2xl transition pt-2">
        <div className="p-4 flex flex-col justify-center items-center border-b">
          <input
            type="text"
            value={newcity}
            onChange={(e) => setNewcity(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
          />
        </div>
        <div className="p-4 gap-4 flex flex-col justify-center items-center border-b">
          {isAdded ? (
            <a
              role="button"
              className="py-4 px-6 text-lg w-full bg-green-500 text-center text-white rounded-md"
            >
              Cidade adicionada!
            </a>
          ) : (
            <>
              {
                <a
                  role="button"
                  onClick={() => toggleAdded(true)}
                  className="py-4 px-6 text-lg w-full bg-black text-center text-white hover:text-white rounded-md hover:bg-gray-900"
                >
                  Adicionar cidade
                </a>
              }
            </>
          )}
        </div>
      </section>
    </div>
  );
}

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
            <h2 className="font-bold text-3xl mr-3 lg:mr-10">
              {isLoading ? `` : `${weatherData.temperature} C`}
            </h2>
          </div>
        </div>
        <CloseIcon index={index} refreshCities={refreshCities} />
      </section>
    </div>
  );
}

function Home() {
  const [existingCities, setExistingCities] = useState<any | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = getCities();
        setExistingCities(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const refreshCities = () => {
    try {
      const cities = getCities();
      setExistingCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <Page>
      <section className="flex flex-col gap-6 m-10">
        <Text variant="h1" className="text-center">
          Como está o tempo agora?
        </Text>
        <Text className="text-justify">
          Este site utiliza as informações fornecidas por{" "}
          <Link href="https://openweathermap.org/" target="_blank">
            OpenWeather
          </Link>{" "}
          a fim de entregar dados confiáveis e obtidos em tempo real.
        </Text>
      </section>

      <hr className="border-t border-accents-2 my-6" />
      <section className="flex flex-col gap-3">
        <AddCity refreshCities={refreshCities} />
      </section>
      <section>
        {existingCities ? (
          existingCities.map((cidade: string, index: number) => (
            <section key={index} className="flex flex-col gap-3">
              <ProductCard
                nomeCidade={cidade}
                index={index}
                refreshCities={refreshCities}
              />
            </section>
          ))
        ) : (
          <p>Loading cities...</p>
        )}
      </section>
    </Page>
  );
}

export default Home;
