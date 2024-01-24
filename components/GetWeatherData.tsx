async function GetWeatherData(cidade: string) {
  try {
    const api_url = process.env.API_URL;
    const api_key = process.env.API_KEY;

    const response = await fetch(
      `${api_url}${cidade}&units=metric&lang=pt_br&appid=${api_key}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const dadosTemporaisApi = await response.json();
      return {
        city:
          dadosTemporaisApi.name.charAt(0).toUpperCase() +
          dadosTemporaisApi.name.slice(1),
        temperature: parseInt(dadosTemporaisApi.main.temp),
        description: dadosTemporaisApi.weather[0].description,
        icon: dadosTemporaisApi.weather[0].icon,
      };
    } else {
      throw new Error("Something went wrong on API server!");
    }
  } catch (error) {
    console.error(error);
  }
}

export default GetWeatherData;
