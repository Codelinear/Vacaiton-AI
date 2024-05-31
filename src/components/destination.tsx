"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { VacationSchema } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/store";

const Destination = ({
  vacationForm,
}: {
  vacationForm: UseFormReturn<VacationSchema, any, undefined>;
}) => {
  const changeContent = useStore((state) => state.changeContent);

  const { toast } = useToast();

  return (
    <div className="flex px-7 max-[464px]:flex-col justify-center items-center">
      <FormField
        control={vacationForm.control}
        name="destination"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                className="ring-offset-0 text-sm sm:text-lg h-auto rounded-full py-2 sm:py-3 px-5 sm:px-8 placeholder:text-[#e1faff7f] border m-2 w-60 sm:w-96 backdrop-blur-3xl border-[#B2B2B2] bg-[#ffffff0d] focus-visible:ring-offset-0 selection:bg-blue-300 transition duration-200"
                autoComplete="off"
                placeholder="Enter the destination"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (!vacationForm.getValues("destination")) {
                      toast({
                        description: "Please enter the destination.",
                      });
                    } else {
                      changeContent("vacationDetail");
                    }
                  }
                }}
                required
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        className="bg-[#0F1599] text-sm m-3 max-[464px]:w-60 sm:text-lg hover:bg-[#0F1599] rounded-full py-4 px-5 sm:py-7 sm:px-8"
        onClick={() =>
          !vacationForm.getValues("destination")
            ? toast({
                description: "Please enter the destination.",
              })
            : changeContent("vacationDetail")
        }
        type="button"
      >
        Start Planning
      </Button>
    </div>
  );
};

export default Destination;
