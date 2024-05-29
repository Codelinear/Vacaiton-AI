import { z } from "zod";

export const vacationSchema = z.object({
  destination: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  reason: z.string(),
});
