import Sidebar from "@/app/components/Sidebar/page"
import getUsers from "../action/getUsers"
import UserList from "./components/UserList";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {

    const users = await getUsers();

    return (

        <Sidebar>
            <div className="h-full">
                <UserList items={users} />
                {children}
            </div>
        </Sidebar >


    )
}