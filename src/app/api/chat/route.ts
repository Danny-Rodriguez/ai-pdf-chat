import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { createOrReadVectorStoreIndex } from "@/lib/vector-store";
import { MetadataMode } from "llamaindex";
import { sys } from "typescript";
import { MAX_RESPONSE_TOKENS, trimMessages } from "@/lib/tokens";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemMessage = {
    role: "system",
    content: "You are a helpful AI assistant"
  };

  const latestMessage = messages[messages.length - 1];
  const index = await createOrReadVectorStoreIndex();

  const retriever = index.asRetriever();
  retriever.similarityTopK = 1;

  const [matchingNode] = await retriever.retrieve(latestMessage.content);

  if (matchingNode.score > 0) {
    const knowledge = matchingNode.node.getContent(MetadataMode.NONE);

    systemMessage.content = `
    You are a helpful AI asssistant. Your knowledge is enriched by this document:
    ---
    ${knowledge}
    ---
    When possible, explain the reasoning for your response based on this knowledge.
    `;

    // console.log("knowledge", knowledge);
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: MAX_RESPONSE_TOKENS,
    messages: trimMessages([systemMessage, ...messages]),
    stream: true
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
