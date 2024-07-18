'use client'


import React from 'react'
import EmptyState from '../components/EmptyState'

const page = () => {
    return (
        <div className='hidden lg:block lg:pl-80 h-full'>
            {/* <button onClick={() => signOut()}>Logout</button> */}
            <EmptyState />
        </div>
    )
}

export default page
