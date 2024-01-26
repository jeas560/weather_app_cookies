async function fetchWeatherData(apiUrl: string): Promise<any> {
  const response = await fetch(apiUrl, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Something went wrong on API server!");
  }

  return response.json();
}

async function GetWeatherData(cidade: string): Promise<any> {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = `${api_url}${cidade}&units=metric&lang=pt_br&appid=${api_key}`;

  const dadosTemporaisApi = await fetchWeatherData(apiUrl);
  return {
    city: capitalizeFirstLetter(dadosTemporaisApi.name),
    temperature: parseFloat(dadosTemporaisApi.main.temp),
    humidity: parseFloat(dadosTemporaisApi.main.humidity),
    description: dadosTemporaisApi.weather[0].description,
    icon: dadosTemporaisApi.weather[0].icon,
  };
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default GetWeatherData;
