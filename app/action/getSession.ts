import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth"; // Import from the correct file

export default async function getSession() {
    return await getServerSession(authOptions);
}
