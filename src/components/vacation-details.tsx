import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VacationSchema } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import CalendarIcon from "@/components/ui/icons/calender";
import { cn } from "@/lib/utils";
import { reasons } from "@/lib/constants/array";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const VacationDetails = ({
  vacationForm,
}: {
  vacationForm: UseFormReturn<VacationSchema, any, undefined>;
}) => {
  const isMissingField =
    !vacationForm.getValues("startDate") ||
    !vacationForm.getValues("endDate") ||
    !vacationForm.getValues("reason");

  return (
    <div className="w-full overflow-y-scroll pb-5 h-[60vh]">
      <div className="mb-3">
        <h3 className="text-base mb-5">How long is your vacation?</h3>
        <div className="flex md:flex-row flex-col justify-center">
          <FormField
            control={vacationForm.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <fieldset className="border w-60 md:w-full backdrop-blur-3xl bg-[#ffffff0d] px-5 lg:px-8 border-[#B2B2B2] rounded-full cursor-pointer">
                        <legend className="text-start text-xs px-0.5 pointer-events-none">
                          Start Date
                        </legend>

                        <Button
                          type="button"
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal mb-[0.35rem] text-[#E1FAFF80] hover:text-[#E1FAFF80] bg-transparent hover:bg-transparent p-0 border-0"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto text-white h-4 w-4 opacity-50" />
                        </Button>
                      </fieldset>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      className={inter.className}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={vacationForm.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col md:mt-0 mt-3 md:ml-3 lg:ml-5 w-1/2">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <fieldset className="border w-60 md:w-full backdrop-blur-3xl bg-[#ffffff0d] px-5 lg:px-8 border-[#B2B2B2] rounded-full cursor-pointer">
                        <legend className="text-start text-xs px-0.5 pointer-events-none">
                          End Date
                        </legend>

                        <Button
                          variant={"outline"}
                          type="button"
                          className={cn(
                            "w-full pl-3 text-left font-normal mb-[0.35rem] text-[#E1FAFF80] hover:text-[#E1FAFF80] bg-transparent hover:bg-transparent p-0 border-0"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto text-white h-4 w-4 opacity-50" />
                        </Button>
                      </fieldset>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() ||
                        new Date(vacationForm.getValues("startDate")) >= date ||
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-9">
          <h3 className="text-base mb-3">What are you looking for?</h3>
          <div className="flex items-center">
            <FormField
              control={vacationForm.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <ToggleGroup
                    type="single"
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-2 self-center justify-self-center lg:grid-cols-3 md:gap-3 lg:gap-5 grid-rows-3 lg:grid-rows-2"
                  >
                    {reasons.map((element) => (
                      <ToggleGroupItem
                        key={element.id}
                        className="font-normal w-full mx-2 justify-self-center backdrop-blur-3xl hover:bg-[#ffffff0d] hover:text-[#e1faff7f] text-xs md:text-sm lg:text-base py-6 px-3 rounded-xl border data-[state=on]:bg-[#ffffff0d] data-[state=on]:text-[#e1faff] border-[#B2B2B2] data-[state=on]:border-white bg-[#ffffff0d] text-[#e1faff7f]"
                        value={element.reason.toLowerCase()}
                      >
                        {element.reason}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Button
          className="bg-[#0F1599] mt-5 text-lg sm:text-lg hover:bg-[#0F1599] rounded-full py-4 px-5 sm:py-7 sm:px-8"
          disabled={isMissingField}
          type="submit"
        >
          Generate Itinerary
        </Button>
      </div>
    </div>
  );
};

export default VacationDetails;
