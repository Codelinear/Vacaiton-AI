"use client";

import axios from "axios";
import Destination from "@/components/destination";
import VacationDetails from "@/components/vacation-details";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import Image from "next/image";

const Vacation = () => {
  const contentType = useStore((state) => state.contentType);

  const vacationForm = useForm<z.infer<typeof vacationSchema>>({
    resolver: zodResolver(vacationSchema),
    mode: "onSubmit",
    defaultValues: {
      destination: "",
      reason: "business",
    },
  });

  const headingRef = useRef<ReactNode>(<></>);
  const vacationRef = useRef<ReactNode>(<></>);

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
    headingRef.current = "";
    vacationRef.current = <Destination vacationForm={vacationForm} />;
  }

  const onSubmit = useCallback(async (values: VacationSchema) => {
    const { destination, reason, startDate, endDate } = values;

    const response = await axios.post("/api/ai/ask", {
      destination,
      reason,
      startDate,
      endDate,
    });
  }, []);

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
