async function fetchWeatherData(apiUrl: string): Promise<any> {
  const response = await fetch(apiUrl, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Something went wrong on API server!");
  }

  return await response.json();
}

export async function validateNewCity(newCity: string): Promise<any> {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = `${api_url}${newCity}&units=metric&lang=pt_br&appid=${api_key}`;
  try {
    const response = await fetchWeatherData(apiUrl);
    return response;
  } catch (error) {
    console.error(`Something goes wrong with ${newCity}:`, error);
    return null;
  }
}

async function GetWeatherData(newCity: string): Promise<any> {
  const dadosTemporaisApi = await validateNewCity(newCity);
  if (dadosTemporaisApi) {
    return {
      city: dadosTemporaisApi.name,
      temperature: parseFloat(dadosTemporaisApi.main.temp),
      humidity: parseFloat(dadosTemporaisApi.main.humidity),
      description: dadosTemporaisApi.weather[0].description,
      icon: dadosTemporaisApi.weather[0].icon,
    };
  } else {
    return null;
  }
}

export default GetWeatherData;
