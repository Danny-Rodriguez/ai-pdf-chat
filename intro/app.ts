import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "user",
      content: "Hey, I'm Danny"
    }
  ]
});

console.log(response.choices);
