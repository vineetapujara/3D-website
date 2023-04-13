import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from Dalle.E Routes" });
});

router.route("/api.openai.com/v1/images/generations").post(async (req, res) => {
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    });
  }
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // const image = response.data.data[0].b64_json;

    res.status(200).send(response.data.data[0].url);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Seomthing went wrong" });
  }
});
export default router;
