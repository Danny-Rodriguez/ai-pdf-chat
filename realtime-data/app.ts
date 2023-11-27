import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI();
import { getProductId } from "./lib/get-product-id.ts";

const functions: any = {
  async recommendedProduct(obj: { description: string }) {
    console.log("Recommended product function called", obj.description);
    const productId = await getProductId(obj.description);

    // Do anything
    // Query a database
    // Call an API

    return {
      url: `https://example.com/products/${productId}`
    };
  }
};

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant that recommends products to users."
    },
    {
      role: "user",
      content: "I'm looking for a pair of running shoes."
    }
  ],
  functions: [
    {
      name: "recommendedProduct",
      description: "Takes a short description of a product and returns a recommended product.",
      parameters: {
        type: "object",
        properties: {
          description: {
            type: "string",
            description: "A short description of a product the user is looking for, ideally a cop paste from the user's message."
          }
        }
      }
    }
  ]
});

console.log(response.choices[0]);

const function_call = response.choices[0].message.function_call;

if (function_call) {
  const fn = functions[function_call.name];
  const args = JSON.parse(function_call.arguments);
  const result = await fn(args);
  console.log("result", result);
}
