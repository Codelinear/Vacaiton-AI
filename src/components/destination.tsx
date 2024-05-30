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
    <div className="flex items-center">
      <FormField
        control={vacationForm.control}
        name="destination"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                className="ring-offset-0 text-lg h-auto rounded-full py-3 px-8 placeholder:text-[#e1faff7f] border mr-5 w-96 backdrop-blur-3xl border-[#B2B2B2] bg-[#ffffff0d] focus-visible:ring-offset-0 selection:bg-blue-300 transition duration-200"
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
        className="bg-[#0F1599] text-lg hover:bg-[#0F1599] rounded-full py-7 px-8"
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
