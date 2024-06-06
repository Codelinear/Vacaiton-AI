import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { suggestionsSystemPrompt } from "@/lib/prompts";

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  const { budget, currency } = await req.json();

  console.log(budget, currency);

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await generateText({
    model: openai("gpt-3.5-turbo-0125"),
    system: suggestionsSystemPrompt,
    prompt: `My budget is ${currency}${budget}.`,
  });

  console.log(response.text);

  return NextResponse.json({
    suggestions: JSON.parse(response.text),
  });
};
