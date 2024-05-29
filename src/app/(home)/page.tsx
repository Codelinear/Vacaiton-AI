import Redirect from "@/components/ui/icons/redirect";
import { redirect } from "next/navigation";
import Vacation from "./vacation";

export default function Home() {
  return (
    <>
      <header id="logo" className="absolute z-[1] top-[5%] left-[5%]">
        <h2 className="font-medium text-3xl pointer-events-none">
          Vacation.AI
        </h2>
        <div className="flex text-sm items-center cursor-pointer justify-end ml-auto mt-2">
          <h4 className="mr-1">by Codelinear</h4>
          <Redirect />
        </div>
      </header>
      <Vacation />
    </>
    // <main className="flex min-h-screen px-4 sm:px-14 flex-wrap w-screen items-center justify-center">
    //   <section className="my-7 mx-4">
    //     <h1 className="text-3xl min-[1024px]:hidden font-bold text-center my-4">
    //       Vacation.ai
    //     </h1>
    //     <h2 className="text-xl min-[1024px]:hidden font-semibold my-4 text-center text-gray-400">
    //       An AI assistant to plan your vacation.
    //     </h2>

    //     <Form {...vacationForm}>
    //       <form
    //         onSubmit={vacationForm.handleSubmit(onSubmit)}
    //         className="space-y-8 sm:mx-0 mx-4 my-10 w-[90vw] min-[400px]:w-96"
    //       >
    //         <FormField
    //           control={vacationForm.control}
    //           name="destination"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Destination</FormLabel>
    //               <FormControl>
    //                 <Input
    //                   {...field}
    //                   disabled={loading}
    //                   className="ring-offset-0 focus-visible:ring-offset-0 transition duration-200"
    //                   placeholder="Enter the destination"
    //                   required
    //                 />
    //               </FormControl>
    //             </FormItem>
    //           )}
    //         />

    //         <FormField
    //           control={vacationForm.control}
    //           name="startDate"
    //           render={({ field }) => (
    //             <FormItem className="flex flex-col">
    //               <FormLabel>Start date</FormLabel>
    //               <Popover>
    //                 <PopoverTrigger asChild>
    //                   <FormControl>
    //                     <Button
    //                       disabled={loading}
    //                       variant={"outline"}
    //                       className={cn(
    //                         "w-full pl-3 text-left font-normal",
    //                         !field.value && "text-muted-foreground"
    //                       )}
    //                     >
    //                       {field.value ? (
    //                         format(field.value, "PPP")
    //                       ) : (
    //                         <span>Pick a date</span>
    //                       )}
    //                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
    //                     </Button>
    //                   </FormControl>
    //                 </PopoverTrigger>
    //                 <PopoverContent className="w-auto p-0" align="start">
    //                   <Calendar
    //                     mode="single"
    //                     selected={field.value}
    //                     onSelect={field.onChange}
    //                     disabled={(date) =>
    //                       date < new Date() || date < new Date("1900-01-01")
    //                     }
    //                     initialFocus
    //                   />
    //                 </PopoverContent>
    //               </Popover>
    //             </FormItem>
    //           )}
    //         />

    //         <FormField
    //           control={vacationForm.control}
    //           name="endDate"
    //           render={({ field }) => (
    //             <FormItem className="flex flex-col">
    //               <FormLabel>End date</FormLabel>
    //               <Popover>
    //                 <PopoverTrigger asChild>
    //                   <FormControl>
    //                     <Button
    //                       disabled={loading}
    //                       variant={"outline"}
    //                       className={cn(
    //                         "w-full pl-3 text-left font-normal",
    //                         !field.value && "text-muted-foreground"
    //                       )}
    //                     >
    //                       {field.value ? (
    //                         format(field.value, "PPP")
    //                       ) : (
    //                         <span>Pick a date</span>
    //                       )}
    //                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
    //                     </Button>
    //                   </FormControl>
    //                 </PopoverTrigger>
    //                 <PopoverContent className="w-auto p-0" align="start">
    //                   <Calendar
    //                     mode="single"
    //                     selected={field.value}
    //                     onSelect={field.onChange}
    //                     disabled={(date) =>
    //                       date < new Date() || date < new Date("1900-01-01")
    //                     }
    //                     initialFocus
    //                   />
    //                 </PopoverContent>
    //               </Popover>
    //             </FormItem>
    //           )}
    //         />

    //         <FormField
    //           control={vacationForm.control}
    //           name="reason"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Reason for your vacation</FormLabel>
    //               <Select
    //                 onValueChange={field.onChange}
    //                 defaultValue={field.value}
    //                 disabled={loading}
    //                 required
    //               >
    //                 <FormControl>
    //                   <SelectTrigger className="ring-offset-0 focus-visible:ring-offset-0 transition duration-200 w-full focus:ring-offset-0">
    //                     <SelectValue placeholder="Reason for the vacation" />
    //                   </SelectTrigger>
    //                 </FormControl>
    //                 <SelectContent>
    //                   <SelectItem value="business">Business</SelectItem>
    //                   <SelectItem value="romantic">Romantic</SelectItem>
    //                   <SelectItem value="solo">Solo</SelectItem>
    //                   <SelectItem value="friends">Friends</SelectItem>
    //                   <SelectItem value="family">Family</SelectItem>
    //                 </SelectContent>
    //               </Select>{" "}
    //             </FormItem>
    //           )}
    //         />

    //         <Button disabled={loading} className="w-full" type="submit">
    //           Submit
    //         </Button>
    //       </form>
    //     </Form>
    //   </section>

    //   <section className="w-[28rem] relative rounded-xl scrollbar-hide h-[32rem] overflow-scroll mx-3 sm:mx-10 my-10 border-2 p-6 text-lg">
    //     {loading ? (
    //       <div className="flex items-center h-full w-full justify-center">
    //         <ClimbingBoxLoader loading={loading} size={20} />
    //       </div>
    //     ) : vacationPlan ? (
    //       <pre
    //         style={{ wordWrap: "break-word" }}
    //         className={cn(
    //           "overflow-x-auto whitespace-pre-wrap",
    //           inter.className
    //         )}
    //       >
    //         <Markdown remarkPlugins={[remarkGfm]}>{vacationPlan}</Markdown>
    //       </pre>
    //     ) : (
    //       <div className="h-full w-full flex flex-col items-center justify-center">
    //         <h1 className="w-full text-center font-semibold text-2xl sm:text-3xl">
    //           Welcome to Vacation.ai
    //         </h1>

    //         <h2 className="my-4 text-center text-lg sm:text-xl text-gray-400">
    //           Start planning your vacation with us.
    //         </h2>
    //       </div>
    //     )}
    //   </section>
    // </main>
  );
}
