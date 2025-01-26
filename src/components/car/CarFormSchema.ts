import * as z from "zod";

export const carFormSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1886, "Year must be after 1886").max(new Date().getFullYear() + 1),
  trim: z.string().optional(),
  color: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  instagram_url: z.string().url().optional().or(z.literal("")),
});

export type CarFormValues = z.infer<typeof carFormSchema>;