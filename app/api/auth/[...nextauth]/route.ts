import NextAuth from "next-auth";
import { authOptions } from "@/app/libs/auth";

const handler = async (req: any, res: any) => {
    try {
        await NextAuth(req, res, authOptions);
    } catch (error) {
        console.error('NextAuth Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
export { handler as GET, handler as POST };