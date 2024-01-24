import Image from "next/image";
import { Text, Page, Link } from "@vercel/examples-ui";
import { GetStaticProps } from "next";
import useSWR from "swr";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  stock: number;
}

interface Props {
  product: Product;
}

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      product: {
        id: "mug-nextjs",
        title: "Vercel Mug",
        description: "Limited Edition",
        image: "/mug.png",
        price: 150,
        stock: 5,
      },
    },
  };
};

function ProductCard({ product }: Props) {
  const [isAdded, toggleAdded] = useState<boolean>(false);
  const { data: stock } = useSWR(`/api/product/${product.id}/stock`, fetcher, {
    refreshInterval: 100000,
  });
  const isLoading = stock === undefined;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isAdded) {
      timeout = setTimeout(() => {
        toggleAdded(false);
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [isAdded]);

  return (
    <div className="w-5/6 max-w-lg mx-auto">
      <section className="border border-gray-300 bg-white rounded-lg shadow-lg mt-8 w-full hover:shadow-2xl transition pt-2">
        <div className="p-4 flex flex-col justify-center items-center border-b">
          <div className="flex justify-between w-full items-baseline">
            <div className="ml-3 lg:ml-10">
              <Image
                className="pointer-events-none"
                alt={product.title}
                src={
                  isLoading
                    ? ``
                    : `http://openweathermap.org/img/w/${stock.icon}.png`
                }
                width="50"
                height="50"
              />
            </div>
            <div className="ml-4 mr-auto text-left flex flex-col">
              <h2 className="font-semibold text-2xl">
                {isLoading ? `` : `${stock.city}`}
              </h2>
              <h3 className="text-gray-700">
                {isLoading ? `` : `${stock.description}`}
              </h3>
            </div>
            <h2 className="font-bold text-3xl mr-3 lg:mr-10">
              {isLoading ? `` : `${stock.temperature}C`}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}

function AddCity(cidade: string) {
  const [isAdded, toggleAdded] = useState<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isAdded) {
      timeout = setTimeout(() => {
        toggleAdded(false);
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [isAdded]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <section className="border border-gray-300 bg-white rounded-lg shadow-lg mt-16 w-full hover:shadow-2xl transition pt-16 lg:pt-24">
        <div className="p-4 flex flex-col justify-center items-center border-b"></div>
        <div className="p-4 gap-4 flex flex-col justify-center items-center border-b">
          {isAdded ? (
            <a
              role="button"
              className="py-4 px-6 text-lg w-full bg-green-500 text-center text-white rounded-md"
            >
              Added!
            </a>
          ) : (
            <>
              {
                <a
                  role="button"
                  onClick={() => toggleAdded(true)}
                  className="py-4 px-6 text-lg w-full bg-black text-center text-white hover:text-white rounded-md hover:bg-gray-900"
                >
                  Add to cart
                </a>
              }
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function Home({ product }: Props) {
  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Como está o tempo agora?</Text>
        <Text>
          Este site utiliza as informações fornecidas por{" "}
          <Link href="https://openweathermap.org/">OpenWeather</Link> a fim de
          entregar dados confiáveis e obtidos em tempo real.
        </Text>
      </section>

      <hr className="border-t border-accents-2 my-6" />

      <section className="flex flex-col gap-3">
        <ProductCard product={product} />
      </section>
      <section className="flex flex-col gap-3">
        <ProductCard product={product} />
      </section>
    </Page>
  );
}

export default Home;
