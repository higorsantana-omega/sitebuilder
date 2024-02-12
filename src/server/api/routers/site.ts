/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { siteSchema } from "~/schemas/site";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const siteRouter = createTRPCRouter({
  create: publicProcedure
    .input(siteSchema)
    .mutation(async ({ ctx, input }) => {
      const page = await ctx.db.page.create({
        data: {
          name: input.name,
          pathName: input.path,
        },
      });

      return page.id
    }),
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const pages = await ctx.db.page.findMany();
      return pages
    })
});
