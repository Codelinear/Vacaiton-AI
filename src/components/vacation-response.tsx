import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { responseItems } from "@/lib/constants/array";
import { cn } from "@/lib/utils";
import { graphik } from "@/lib/font";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useStore } from "@/store";

const VacationResponse = ({
  isLoading,
  response,
}: {
  isLoading: boolean;
  response: string;
}) => {
  const changeContent = useStore((state) => state.changeContent);

  return (
    <div className="relative bg-[#FFFFFF0D] p-10 w-[50rem] h-[70vh] rounded-xl">
      <div className="absolute rounded-full p-3 bg-[#060A24B2] left-1/2 -translate-x-1/2 bottom-0 backdrop-blur-3xl translate-y-1/2 flex justify-between w-4/5 items-center">
        <Button
          className="bg-[#0F1599] text-base hover:bg-[#0F1599] rounded-full py-6 px-5"
          onClick={() => changeContent("destination")}
          type="button"
        >
          Generate Another
        </Button>
        <div className="flex ml-10">
          {responseItems.map((element) => (
            <div
              key={element.id}
              className="mx-3 flex items-center hover:opacity-100 opacity-80 cursor-pointer transition duration-300"
            >
              {element.icon}
              <span className="ml-2 text-sm font-normal">{element.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* {isLoading ? ( */}
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index + 1}
          className={`bg-[#FFFFFF1A] ${
            index === 0 ? "mb-8 w-1/2" : "my-3 w-4/5"
          }  h-6 rounded-sm`}
        />
      ))}
      {/* ) : (
        <pre
          style={{ wordWrap: "break-word" }}
          className={cn(
            "overflow-x-auto whitespace-pre-wrap",
            graphik.className
          )}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>
        </pre>
      )} */}
    </div>
  );
};

export default VacationResponse;
