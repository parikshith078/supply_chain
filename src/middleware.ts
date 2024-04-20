import { authMiddleware } from "@clerk/nextjs";

// TODO: Update public routes
export default authMiddleware({
  publicRoutes: ["/", "/contact", "/about", "/api/edgestore/init"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/(api|trpc)(.*)"],
};
