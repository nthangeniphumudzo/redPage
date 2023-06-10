import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],

  //@ts-ignore
  async session({ session }) {},
  //@ts-ignore
  async signIn({ profile }) {},
});

export { handler as GET, handler as POST };
