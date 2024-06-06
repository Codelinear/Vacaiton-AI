"use client";

import Destination from "@/components/destination";
import VacationDetails from "@/components/vacation-details";
import { Form } from "@/components/ui/form";
import React, { ReactNode, useCallback, useRef, useState } from "react";
import { VacationSchema } from "@/types";
import { vacationSchema } from "@/lib/validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { inriaSerif } from "@/lib/font";
import BgVector from "@/components/ui/icons/bg-vector";
import VacationResponse from "@/components/vacation-response";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { currencies } from "@/lib/constants/array";
import { Button } from "@/components/ui/button";

const Vacation = () => {
  const [response, setResponse] = useState();
  const [currency, setCurrency] = useState("USD");
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [budget, setBudget] = useState("");

  const contentType = useStore((state) => state.contentType);
  const changeContent = useStore((state) => state.changeContent);
  const responseLoading = useStore((state) => state.responseLoading);
  const setResponseLoading = useStore((state) => state.setResponseLoading);

  const vacationForm = useForm<z.infer<typeof vacationSchema>>({
    resolver: zodResolver(vacationSchema),
    mode: "onSubmit",
    defaultValues: {
      destination: "",
      reason: "",
    },
  });

  const { toast } = useToast();

  const headingRef = useRef<ReactNode>(<></>);
  const vacationRef = useRef<ReactNode>(<></>);

  const onSubmit = useCallback(
    async (values: VacationSchema) => {
      const { destination, startDate, endDate, reason } = values;

      if (new Date(startDate) > new Date(endDate)) {
        toast({
          description: "Start Date must be lower than End Date.",
        });
        return;
      }

      changeContent("vacation");

      setResponseLoading(true);

      const { data } = await axios.post("/api/ai/ask", {
        destination,
        endDate,
        reason,
        startDate,
      });

      setResponseLoading(false);

      setResponse(data.plan.itinerary);
    },
    [changeContent, setResponseLoading, toast]
  );

  if (contentType === "destination") {
    headingRef.current = (
      <h1
        className={cn(
          inriaSerif.className,
          `text-center text-3xl sm:text-5xl mx-5 md:text-6xl mb-2`
        )}
      >
        Let’s plan your vacation
      </h1>
    );
    vacationRef.current = (
      <>
        <Destination vacationForm={vacationForm} />
        <div className="flex px-7 max-[464px]:flex-col justify-center items-center">
          <div className="ring-offset-0 text-sm sm:text-lg h-auto rounded-full py-2 sm:py-3 px-3 sm:px-5 placeholder:text-[#e1faff7f] border m-2 w-60 sm:w-96 backdrop-blur-3xl border-[#B2B2B2] bg-[#ffffff0d] focus-visible:ring-offset-0 selection:bg-blue-300 transition flex duration-200">
            <select
              disabled={suggestionsLoading}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent cursor-pointer w-16 border-none scrollbar-hide outline-none mr-4"
            >
              {currencies.map((currency) => (
                <option
                  key={uuidv4()}
                  value={currency}
                  className="bg-black rounded-lg"
                >
                  {currency}
                </option>
              ))}
            </select>

            <input
              disabled={suggestionsLoading}
              className="bg-transparent border-none outline-none w-full"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter the budget"
            />
          </div>
          <Button
            className="bg-[#0F1599] text-sm m-3 max-[464px]:w-60 sm:text-lg hover:bg-[#0F1599] rounded-full py-4 px-5 sm:py-7 sm:px-8"
            disabled={budget === "" || suggestionsLoading}
            onClick={async () => {
              if (budget === "") {
                toast({
                  description: "Please enter the destination.",
                });
              } else {
                setSuggestionsLoading(true);

                const res = await axios.post("/api/ai/suggestions", {
                  budget,
                  currency,
                });

                setSuggestionsLoading(false);

                setSuggestions(res.data.suggestions.destinations);
              }
            }}
            type="button"
          >
            Suggest
          </Button>
        </div>
      </>
    );
  } else if (contentType === "vacationDetail") {
    headingRef.current = (
      <h1
        className={cn(
          inriaSerif.className,
          `text-center text-3xl md:text-4xl lg:text-5xl mx-5 mt-32 xl:mt-10`
        )}
      >
        Tell us more about your vacation
      </h1>
    );
    vacationRef.current = <VacationDetails vacationForm={vacationForm} />;
  } else {
    headingRef.current = (
      <h1
        className={cn(
          inriaSerif.className,
          `text-center text-3xl md:text-4xl max-[900px]:mt-20 lg:text-5xl mt-10`
        )}
      >
        Here’s your itinerary
      </h1>
    );
    vacationRef.current = (
      <VacationResponse
        isLoading={responseLoading}
        vacationForm={vacationForm}
        response={response}
      />
    );
  }

  return (
    <main className="h-screen relative overflow-hidden w-full flex items-center justify-center">
      <div className="absolute">
        <div className="h-full top-0 absolute w-full">
          <div
            style={{ background: "url(/light-noise.png)" }}
            className="h-1/2 w-full bg-cover absolute top-0 opacity-30 bg-center bg-no-repeat"
          ></div>
          <div
            style={{ background: "url(/noiseTexture.png)" }}
            className="h-1/2 w-full bg-cover absolute opacity-20 top-1/2 bg-center bg-no-repeat"
          ></div>
        </div>
        <BgVector className="rotate-[-27.77]" />
      </div>
      <section className="flex absolute z-[1] flex-col items-center justify-center">
        {contentType === "destination" && (
          <div className="max-w-3xl h-32 absolute left-1/2 -translate-x-1/2 top-[95%] w-full rounded-xl bg-transparent grid grid-cols-3 grid-rows-2 p-2 gap-2">
            {suggestions?.map((element) => (
              <span
                key={uuidv4()}
                data-value={element}
                onClick={(e) => {
                  const destination = (
                    e.target as HTMLSpanElement
                  ).getAttribute("data-value");

                  if (!destination) {
                    return;
                  }

                  vacationForm.setValue("destination", destination);
                }}
                className="border-2 cursor-pointer bg-[#ffffff0d] rounded-lg flex items-center justify-center backdrop-blur-3xl"
              >
                {element}
              </span>
            ))}
          </div>
        )}
        {headingRef.current && headingRef.current}
        <Form {...vacationForm}>
          <form
            onSubmit={vacationForm.handleSubmit(onSubmit)}
            className={`my-10 ${
              contentType === "vacationDetail" &&
              "w-[80vw] md:w-[30rem] lg:w-[40rem]"
            }`}
          >
            {vacationRef.current}
          </form>
        </Form>
      </section>
    </main>
  );
};

export default Vacation;
