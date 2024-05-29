"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { VacationSchema } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { useStore } from "@/store";

const Destination = ({
  vacationForm,
}: {
  vacationForm: UseFormReturn<VacationSchema, any, undefined>;
}) => {
  const changeContent = useStore((state) => state.changeContent);

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
                className="ring-offset-0 text-lg h-auto rounded-full py-3 px-8 placeholder:text-[#e1faff7f] border mr-5 w-96 backdrop-blur-3xl border-[#B2B2B2] bg-[#ffffff0d] focus-visible:ring-offset-0 transition duration-200"
                placeholder="Enter the destination"
                required
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        className="bg-[#0F1599] text-lg hover:bg-[#0F1599] rounded-full py-7 px-8"
        onClick={() => changeContent("vacationDetail")}
        type="button"
      >
        Start Planning
      </Button>
    </div>
  );
};

export default Destination;
