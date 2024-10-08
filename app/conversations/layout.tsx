import getConversations from '../action/getConversations'
import getUsers from '../action/getUsers';
import Sidebar from '../components/Sidebar/page'
import ConversationList from './components/ConversationList'

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
    const conversations = await getConversations();
    const users = await getUsers();
    return (
        <Sidebar>
            <div className='h-full'>
                <ConversationList users={users} initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    )
}