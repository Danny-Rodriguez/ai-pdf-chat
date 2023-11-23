import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI();

const goal = "Renovate a kitchen";
const numTasks = 5;

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "system",
      content: `You are a talented task planner. The user will tell you their goal and you will generate a list of tasks for them.

      You must repond in JOSN, strictly with the following:

      {
        tasks: {
          title: string // Max 100 characters,
          description: string // Max 120 characters,
          difficulty: "easy" | "medium" | "hard",
        }[],
      }
      `
    },
    {
      role: "user",
      content: `Tell me how to achive ${goal}, produce ${numTasks} tasks.`
    }
  ]
});

console.log(JSON.parse(response.choices[0].message.content as string));
