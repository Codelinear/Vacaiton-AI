import { NextRequest, NextResponse } from "next/server";
import { StreamingTextResponse, streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  try {
    const { prompt, endDate, reason, startDate } = await req.json();

    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const systemPrompt = `Plan a ${reason} vacation itinerary for me from ${
      startDate.toString().split("T")[0]
    } to ${
      endDate.toString().split("T")[0]
    } in ${prompt}. Include popular places to visit and activities to do. You must give the response in a list format so that the plan is visually understandable. If someone gives an invalid destination which is not there then you'll simply say "I'm not getting the valid destination to design a vacation."`;

    const response = await streamText({
      model: anthropic("claude-3-sonnet-20240229"),
      temperature: 0,
      prompt: systemPrompt,
    });

    return new StreamingTextResponse(response.toAIStream());
    // return response.toAIStreamResponse();
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 404 }
    );
  }
};
