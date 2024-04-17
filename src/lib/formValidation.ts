
import { z } from "zod";


export const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  address: z.string().min(5),
  type: z.enum(["farmer", "processor", "distributor", "retailer"]),
});

export type formSchemaType = z.infer<typeof formSchema>



