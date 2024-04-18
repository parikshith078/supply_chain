
import { z } from "zod";


export const registrationFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  address: z.string().min(5),
  type: z.enum(["farmer", "processor", "distributor", "retailer"]),
});
export type registrationFormSchemaType = z.infer<typeof registrationFormSchema>

export const createProductListingScheme = z.object({
  dateOfHarvest: z.date(),
  description: z.string().min(2),
  quantity: z.number().min(1),
  isAviliable: z.boolean(),
  price: z.number().min(1),
})

export type createProductListingType = z.infer<typeof createProductListingScheme>





