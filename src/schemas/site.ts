import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(4),
  path: z.string().min(4)
});

export type siteSchemaType = z.infer<typeof siteSchema>;
