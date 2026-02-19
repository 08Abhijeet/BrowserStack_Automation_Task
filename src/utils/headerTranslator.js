
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function translateText(text) {
  const response = await axios.post(
    "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
    {
      from: "es",
      to: "en",
      q: text,
    },
    {
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
      },
    }
  );

  return response.data[0];
}
