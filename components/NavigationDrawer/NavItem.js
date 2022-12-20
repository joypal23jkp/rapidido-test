import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid'

export default function NavItem({icon, label, onClick = () => {}}) {
    return (
        <div className="flex items-center px-3 hover:bg-gray-100 py-2 cursor-pointer anim__scale__105" onClick={onClick}>
            <div className="bg-primary rounded-full p-2 flex items-center justify-center mr-2 w-8 h-8">
                {icon}
            </div>
            <div className="font-normal text-lg mr-auto">
                <span className="text-left w-full">{label}</span>
            </div>
            <div>
                <ChevronRightIcon className="w-5 h-5" />
            </div>
        </div>
    )
}
