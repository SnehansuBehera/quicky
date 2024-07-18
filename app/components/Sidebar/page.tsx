

import React from 'react'
import Desktopsidebar from './Desktopsidebar'
import MobileFooter from './MobileFooter'
import getCurrentUser from '@/app/action/getCurrentUser'

async function page({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()

    return (
        <div className='h-full'>
            <Desktopsidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className='lg:pl-20 h-full'>
                {children}
            </main>

        </div>
    )
}

export default page
