import { Message } from "ai";
import { encoding_for_model } from "@dqbd/tiktoken";
// import { count } from "console";

const encoding = encoding_for_model("gpt-3.5-turbo");
const TOKEN_LIMIT = 4097 * 0.9; // 90% of the max token limit
export const MAX_RESPONSE_TOKENS = 600;

function countTokens(text: string) {
  const tokens = encoding.encode(text);
  return tokens.length;
}

export function trimMessages(messages: Message[]): Message[] {
  const [systemMessage, ...restMessages] = messages;

  let totalTokens = countTokens(systemMessage.content) + MAX_RESPONSE_TOKENS;
  const trimmedMessages = [];

  // Keep as many messages as possible under the token limit
  for (const messages of restMessages.reverse()) {
    const newTotalTokens = totalTokens + countTokens(messages.content);

    if (newTotalTokens > TOKEN_LIMIT) {
      break;
    } else {
      trimmedMessages.unshift(messages);
      totalTokens = newTotalTokens;
    }
  }

  console.log(`Total tokens: ${totalTokens}`);

  trimmedMessages.unshift(systemMessage);
  return trimmedMessages;
}
