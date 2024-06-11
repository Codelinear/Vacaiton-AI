"use client";

import React, { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { UseFormReturn } from "react-hook-form";
import { VacationSchema } from "@/types";
import { v4 as uuidv4 } from "uuid";
import Download from "@/components/ui/icons/download";
import { generatePDF } from "@/lib/functions/generate-pdf";

const VacationResponse = ({
  isLoading,
  response,
  vacationForm,
}: {
  isLoading: boolean;
  response: { day: string; activities: string[] }[] | undefined;
  vacationForm: UseFormReturn<VacationSchema, any, undefined>;
}) => {
  const changeContent = useStore((state) => state.changeContent);

  const textRef = useRef<HTMLDivElement | null>(null);
  const responseContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading) {
      responseContainerRef.current?.scrollTo({
        top:
          responseContainerRef.current?.scrollHeight +
          responseContainerRef.current?.offsetHeight,
        behavior: "smooth",
      });
    }
  }, [isLoading]);

  return (
    <div className="relative bg-[#FFFFFF0D] p-10 w-[85vw] min-[900px]:w-[50rem] h-[60vh] min-[900px]:h-[69vh] rounded-xl">
      <div className="absolute rounded-full p-3 bg-[#060A24B2] left-1/2 -translate-x-1/2 bottom-0 backdrop-blur-3xl translate-y-1/2 flex justify-between items-center">
        <Button
          className="bg-[#0F1599] text-base hover:bg-[#0F1599] rounded-full min-[900px]:py-6 min-[900px]:px-5"
          disabled={isLoading}
          onClick={() => {
            changeContent("destination");

            vacationForm.reset();
          }}
          type="button"
        >
          Generate Another
        </Button>
        <div className="flex ml-10">
          <div
            className={`mx-3 max-[900px]:hidden flex items-center hover:opacity-100 opacity-80 cursor-pointer transition duration-300`}
            onClick={() => generatePDF(response!)}
          >
            <div>
              <Download />
            </div>
            <span
              className={`ml-2 w-24 text-sm max-[900px]:hidden font-normal`}
            >
              Download this
            </span>
          </div>
        </div>
      </div>
      <div
        ref={responseContainerRef}
        className="overflow-scroll scrollbar-hide w-full h-full"
      >
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index + 1}
              className={`bg-[#FFFFFF1A] ${
                index === 0 ? "mb-8 w-1/2" : "my-3 w-4/5"
              }  h-6 rounded-sm`}
            />
          ))
        ) : (
          <div ref={textRef}>
            {response?.map((element) => (
              <div key={uuidv4()}>
                <h2 className="text-2xl mb-4 font-bold">{element.day}</h2>
                <ul className="ml-6 mb-7 list-disc">
                  {element.activities.map((activity) => (
                    <li key={uuidv4()} className="my-3">
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VacationResponse;
