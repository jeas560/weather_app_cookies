import { Text, Page, Link } from "@vercel/examples-ui";
import { useEffect, useState } from "react";
import { getCities } from "../services/cookieUtils";
import AddCity from "../components/AddCity";
import ProductCard from "../components/ProductCard";

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
          <p className="text-center">Loading cities...</p>
        )}
      </section>
    </Page>
  );
}

export default Home;
