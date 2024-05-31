import { NextRequest, NextResponse } from "next/server";
import { StreamingTextResponse, streamText } from "ai";
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  try {
    const { prompt, endDate, reason, startDate } = await req.json();

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const systemPrompt = `Plan a ${reason} vacation itinerary for me from ${
      startDate.toString().split("T")[0]
    } to ${
      endDate.toString().split("T")[0]
    } in ${prompt}. Include popular places to visit and activities to do. You must give the response in a list format so that the plan is visually understandable. If someone gives an invalid destination which is not there then you'll simply say "I'm not getting the valid destination to design a vacation."`;

    const response = await streamText({
      model: google("models/gemini-1.5-flash-latest"),
      temperature: 0,
      prompt: systemPrompt,
    });

    return new StreamingTextResponse(response.toAIStream());
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
