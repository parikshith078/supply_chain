import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/contact", "/about", "/api/edgestore/init", "/market/:path+"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/(api|trpc)(.*)"],
};
