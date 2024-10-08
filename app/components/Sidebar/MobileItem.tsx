'use client'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface MobileItemProps {
    href: string,
    icon: any,
    active?: boolean,
    onClick?: () => void
}
const MobileItem: React.FC<MobileItemProps> = ({
    href, icon: Icon, active, onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }
    return (
        <Link onClick={handleClick} href={href} className={clsx(`group flex gap-x-3 text-2xl leading-6 font-bold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`, active && 'bg-gray-100 text-black')}>
            <Icon />
        </Link>
    )
}

export default MobileItem
