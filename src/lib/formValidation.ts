import { z } from "zod";

export const registrationFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  address: z.string().min(5),
  type: z.enum(["farmer", "processor", "distributor", "retailer"]),
});
export type registrationFormSchemaType = z.infer<typeof registrationFormSchema>;

export const createProductFromScheme = z.object({
  dateOfHarvest: z.date(),
  description: z.string().min(2),
  quantity: z.coerce.number().min(1),
  price: z.coerce.number().min(1),
  fileUrl: z.string(),
  catalogProductId: z.string(),
  image: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
});

export type createProductFromSchemaType = z.infer<
  typeof createProductFromScheme
>;
