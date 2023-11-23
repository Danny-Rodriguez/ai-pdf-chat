import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI();

const knowledge = {
  NewYork: {
    stock: {
      "Nike SB": {
        "size 9": 1,
        "size 10": 1,
        "size 11": 3,
        "size 12": 4
      }
    }
  },
  LosAngeles: {
    stock: {
      "Nike SB": {
        "size 13": 4
      }
    }
  }
};

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "system",
      content: `You are a the BestShoes chat bot. Here is your entire knowledge. You know nothing but this knowledge: ${JSON.stringify(knowledge)}. Carefully read through the stock a few times and only consider an item to be available if it has at least 1 unit. Pay close attention to the location, and do not confuse the stock of one location with another. This could badly impact the business. If a size does not explicitly appear under a location, do not consider it in stock.`
    },
    {
      role: "user",
      content: "Hey, I want to to buy Nike SB shoes size 13. Do you have them in stock in New York?"
    }
  ]
});

console.log(response.choices);
