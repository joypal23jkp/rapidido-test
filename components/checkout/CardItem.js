import React from 'react';
import Image from 'next/image';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';

export default function CardItem({item, onMinusClick = () => {}, onPlusClick = () => {}}) {
  return (
    <div className="mx-auto mb-7">
        <div className="flex rounded-xl shadow-md overflow-hidden bg-white p-2 md:p-4">
            <div className="relative h-[120px] w-[200px] rounded-xl">
                <Image src={item.image} layout="fill" objectFit="cover" alt={item.name} />
            </div>
            <div className="px-2 md:px-8">
                <h1 className="font-semibold md:text-2xl">{item.name}</h1>
                <p className="py-1 text-xs md:text-base	 text-ellipsis overflow-hidden h-[60px] ">
                    This is a longer description to ensure there are not more than 100 characters in the descriptions..
                </p>
                <div className="w-full flex items-center">
                    <div className="font-bold text-sm md:text-base	">{item.price}</div>
                    <div className="flex justify-between w-[140px] mx-2 bg-gray-300 h-[32px] rounded-full">
                        <MinusIcon className="w-8 h-8 rounded-full bg-gray-500 text-white cursor-pointer" onClick={onMinusClick} />
                        <div className="h-full flex items-center text-md font-medium">{item.quantity}</div>
                        <PlusIcon className="w-8 h-8 rounded-full bg-black text-white stroke-none cursor-pointer" onClick={onPlusClick} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
