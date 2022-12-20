import React from "react";
import Image from 'next/image';
import {UserIcon} from "@heroicons/react/outline";

export default function Avatar({ avatar = null, avatarClasses = '', modalClasses = '' }) {
    return (
        <>
            <div
                className={'relative bg-gray-100 w-[100px] h-[100px] rounded-full text-gray-700 p-8 hover:border cursor-pointer' + avatarClasses}>

                {
                    !avatar && <span><UserIcon className="w-8 h-8 text-gray-400" /></span>

                }
                {
                    avatar &&
                    <Image src={avatar} layout="fill" className={'rounded-full'} objectFit="cover" alt={"avatar"}/>

                }
            </div>
        </>
    )
}
