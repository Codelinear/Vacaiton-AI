"use client";

import Destination from "@/components/destination";
import VacationDetails from "@/components/vacation-details";
import { Form } from "@/components/ui/form";
import React, { ReactNode, useCallback, useRef } from "react";
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
import { useCompletion } from "ai/react";

const Vacation = () => {
  const contentType = useStore((state) => state.contentType);
  const changeContent = useStore((state) => state.changeContent);
  const setResponseLoading = useStore((state) => state.setResponseLoading);

  const vacationForm = useForm<z.infer<typeof vacationSchema>>({
    resolver: zodResolver(vacationSchema),
    mode: "onSubmit",
    defaultValues: {
      destination: "",
      reason: "",
    },
  });

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/ai/ask",
    body: {
      startDate: vacationForm.getValues("startDate"),
      endDate: vacationForm.getValues("endDate"),
      reason: vacationForm.getValues("reason"),
    },
    onResponse: () => {
      setResponseLoading(false);
    },
  });

  const { toast } = useToast();

  const headingRef = useRef<ReactNode>(<></>);
  const vacationRef = useRef<ReactNode>(<></>);

  const onSubmit = useCallback(
    async (values: VacationSchema) => {
      const { destination, startDate, endDate } = values;

      if (new Date(startDate) > new Date(endDate)) {
        toast({
          description: "Start Date must be lower than End Date.",
        });
        return;
      }

      changeContent("vacation");

      setResponseLoading(true);

      await complete(destination);
    },
    [changeContent, setResponseLoading]
  );

  if (contentType === "destination") {
    headingRef.current = (
      <h1 className={cn(inriaSerif.className, `text-6xl mb-2`)}>
        Let’s plan your vacation
      </h1>
    );
    vacationRef.current = <Destination vacationForm={vacationForm} />;
  } else if (contentType === "vacationDetail") {
    headingRef.current = (
      <h1 className={cn(inriaSerif.className, `text-5xl mt-10`)}>
        Tell us more about your vacation
      </h1>
    );
    vacationRef.current = <VacationDetails vacationForm={vacationForm} />;
  } else {
    headingRef.current = (
      <h1 className={cn(inriaSerif.className, `text-5xl mt-10`)}>
        Here’s your itinerary
      </h1>
    );
    vacationRef.current = (
      <VacationResponse
        isLoading={isLoading}
        vacationForm={vacationForm}
        response={completion}
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
        {headingRef.current && headingRef.current}
        <Form {...vacationForm}>
          <form
            onSubmit={vacationForm.handleSubmit(onSubmit)}
            className="my-10"
          >
            {vacationRef.current}
          </form>
        </Form>
      </section>
    </main>
  );
};

export default Vacation;
