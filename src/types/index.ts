import { vacationSchema } from "@/lib/validator";
import { z } from "zod";

export type VacationSchema = z.infer<typeof vacationSchema>;
