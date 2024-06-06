import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { vacationSystemPrompt } from "@/lib/prompts";

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  try {
    const { destination, endDate, reason, startDate } = await req.json();

    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await generateText({
      model: openai("gpt-3.5-turbo-0125"),
      system: vacationSystemPrompt,
      prompt: `Plan a vacation itinerary for me. Here are all the parameters:
      \n\n
      Destination: ${destination}
      \n
      Reason: ${reason}
      \n
      Start Date: ${startDate.toString().split("T")[0]}
      \n
      End Date: ${endDate.toString().split("T")[0]}
      `,
    });

    return NextResponse.json({
      plan: JSON.parse(response.text),
    });

    // return new StreamingTextResponse(response.toAIStream());
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
