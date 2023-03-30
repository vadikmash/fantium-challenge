import { createTRPCRouter } from "~/server/api/trpc";
import { collectionsRouter } from "~/server/api/routers/collections";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  collections: collectionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
