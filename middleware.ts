import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
     
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = { matcher: ["/user/:path*", "/admin/:path*"] };
