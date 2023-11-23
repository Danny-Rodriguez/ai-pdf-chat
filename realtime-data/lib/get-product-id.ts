import dotenv from "dotenv";
dotenv.config();

import { Document, VectorStoreIndex } from "llamaindex";

const documents = [
  new Document({
    text: "Nike skateboarding shoes, suitable for all ages and all boards",
    metadata: {
      productId: 1
    }
  }),
  new Document({
    text: "Adidas running shoes, suitable for short and long distances, as well as marathons",
    metadata: {
      productId: 2
    }
  }),
  new Document({
    text: "Hiking shoes, suitalbe for dry weather",
    metadata: {
      productId: 3
    }
  }),
  new Document({
    text: "Hiking shoes, suitable for wet weather",
    metadata: {
      productId: 4
    }
  })
];

const index = await VectorStoreIndex.fromDocuments(documents);
const retriever = index.asRetriever();
retriever.similarityTopK = 1;

export async function getProductId(query: string) {
  console.log("Searching for product id", query);
  const matchingNodes = await retriever.retrieve(query);
  const found = matchingNodes[0];
  console.log("Found", found);
}

await getProductId("I'm going to hike and hot and dry climates. What shoes do I need?");