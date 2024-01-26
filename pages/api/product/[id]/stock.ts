import { NextApiRequest, NextApiResponse } from "next";
import GetWeatherData from "../../../GetWeatherData";

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const dadosTemporaisApi = await GetWeatherData("Lima");
  return res.json(dadosTemporaisApi);
}

export default handler;
