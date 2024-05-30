"use client";

import React, { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { responseItems } from "@/lib/constants/array";
import { cn } from "@/lib/utils";
import { graphik } from "@/lib/font";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useStore } from "@/store";
import { UseFormReturn } from "react-hook-form";
import jsPDF from "jspdf";
import { VacationSchema } from "@/types";

const VacationResponse = ({
  isLoading,
  response,
  vacationForm,
}: {
  isLoading: boolean;
  response: string;
  vacationForm: UseFormReturn<VacationSchema, any, undefined>;
}) => {
  const changeContent = useStore((state) => state.changeContent);
  const responseLoading = useStore((state) => state.responseLoading);

  const textRef = useRef<HTMLPreElement | null>(null);
  const responseContainerRef = useRef<HTMLDivElement | null>(null);

  if (isLoading) {
    responseContainerRef.current?.scrollTo({
      top:
        responseContainerRef.current?.scrollHeight +
        responseContainerRef.current?.offsetHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative bg-[#FFFFFF0D] p-10 w-[50rem] h-[70vh] rounded-xl">
      <div className="absolute rounded-full p-3 bg-[#060A24B2] left-1/2 -translate-x-1/2 bottom-0 backdrop-blur-3xl translate-y-1/2 flex justify-between w-4/5 items-center">
        <Button
          className="bg-[#0F1599] text-base hover:bg-[#0F1599] rounded-full py-6 px-5"
          onClick={() => {
            changeContent("destination");

            vacationForm.reset();
          }}
          type="button"
        >
          Generate Another
        </Button>
        <div className="flex ml-10">
          {responseItems.map((element) => (
            <div
              key={element.id}
              className="mx-3 flex items-center hover:opacity-100 opacity-80 cursor-pointer transition duration-300"
              onClick={() => {
                if (element.text === "Download this") {
                  if (textRef.current) {
                    const doc = new jsPDF();
                    const text = textRef.current.innerText;
                    const formattedText = text.replace(
                      /\n\s*\n\s*\n+/g,
                      "\n\n"
                    );
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const pageHeight = doc.internal.pageSize.getHeight();
                    const margin = 10;
                    const maxLineWidth = pageWidth - margin * 2;
                    const lineHeight = 10;
                    const lines = doc.splitTextToSize(
                      formattedText,
                      maxLineWidth
                    );
                    let cursorY = margin;

                    lines.forEach((line: string) => {
                      if (cursorY + lineHeight > pageHeight - margin) {
                        doc.addPage();
                        cursorY = margin;
                      }
                      doc.text(line, margin, cursorY);
                      cursorY += lineHeight;
                    });

                    doc.save("vacationPlan.pdf");
                  }
                }
              }}
            >
              {element.icon}
              <span className="ml-2 text-sm font-normal">{element.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={responseContainerRef}
        className="overflow-scroll scrollbar-hide w-full h-full"
      >
        {responseLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index + 1}
              className={`bg-[#FFFFFF1A] ${
                index === 0 ? "mb-8 w-1/2" : "my-3 w-4/5"
              }  h-6 rounded-sm`}
            />
          ))
        ) : (
          // pre tag for correct spacing
          <pre
            style={{ wordWrap: "break-word" }}
            className={cn(
              "overflow-x-auto whitespace-pre-wrap",
              graphik.className
            )}
            ref={textRef}
          >
            <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>
          </pre>
        )}
      </div>
    </div>
  );
};

export default VacationResponse;
