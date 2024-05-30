import { NextRequest, NextResponse } from "next/server";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { ChatAnthropic } from "@langchain/anthropic";
import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  try {
    const { destination, endDate, reason, startDate } = await req.json();

    console.log(destination, endDate, reason, startDate);

    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    // const model = new ChatAnthropic({
    //   temperature: 0,
    //   model: "claude-3-sonnet-20240229",
    //   apiKey: process.env.ANTHROPIC_API_KEY,
    //   maxTokens: 1024,
    // });

    const prompt = `Plan a ${reason} vacation itinerary for me from ${
      startDate.toString().split("T")[0]
    } to ${
      endDate.toString().split("T")[0]
    } in ${destination}. Include popular places to visit and activities to do. You must give the response in a list format so that the plan is visually understandable. If someone gives an invalid destination which is not there then you'll simply say "I'm not getting the valid destination to design a vacation."`;

    const response = await streamText({
      model: anthropic("claude-3-sonnet-20240229"),
      prompt,
    });

    // const prompt = ChatPromptTemplate.fromTemplate(
    //   `Plan a {reason} vacation itinerary for me from {startDate} to {endDate} in {destination}. Include popular places to visit and activities to do. You must give the response in a list format so that the plan is visually understandable. If someone gives an invalid destination which is not there then you'll simply say "I'm not getting the valid destination to design a vacation."

    //   Note: Use markdown in response, if needed.`
    // );

    // const chain = prompt.pipe(model);

    // const response = await chain.invoke({
    //   destination,
    //   startDate: startDate.toString().split("T")[0],
    //   endDate: endDate.toString().split("T")[0],
    //   reason,
    // });

    return response.toAIStreamResponse();
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
