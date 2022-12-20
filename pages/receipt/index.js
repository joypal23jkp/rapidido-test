import React, {useEffect, useState} from 'react'
import Image from 'next/image';
import {useRouter} from "next/router";
import { ArrowLeftIcon } from '@heroicons/react/solid';
import {fetchOrder} from "@/api/order";

export default function MyOrder() {

    const router = useRouter();
    const [orderReceipts, setOrderReceipt] = useState([]);
    useEffect(() => {
        fetchOrder().then(response => {
            setOrderReceipt(response.data.payload?.receipts)
        }).catch(error => console.log(error));
    }, [])
    return (
        <div className="bg-[#E5E5E5] min-h-screen w-screen px-4 m-auto">
            <div className="relative h-16 p-4 mb-7">
                <div className="absolute left-0 top-4">
                    <ArrowLeftIcon className="w-10 h-10 text-black cursor-pointer" onClick={() => router.back()} />
                </div>
                <div className="font-medium text-2xl text-black text-center">Receipts</div>
            </div>

            { orderReceipts.length === 0 && <OrderCart item={null} /> }

            {orderReceipts.length > 0 && orderReceipts?.map((item,key) => (
                <OrderCart
                    item={item}
                    key={key}
                />
            ))}
        </div>
    )
}

export function OrderCart({ item }) {
    if (!item) {
        return (
            <div className="mx-auto mb-7">
                <div className="flex justify-center rounded-xl shadow-md overflow-hidden bg-white p-2 md:p-4 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                   <span className={'px-4'}> No Receipt Available</span>
                </div>
            </div>
        )
    }
    return (
        <div className="mx-auto mb-7">
            <div className="flex rounded-xl shadow-md overflow-hidden bg-white p-2 md:p-4">
                <div className="relative h-[50px] w-[60px] md:h-[80px] md:w-[80px]">
                    <Image src={item.companyLogoUrl} layout="fill" className={'rounded-full'} objectFit="cover" alt={item.companyName} />
                </div>
                <div className="px-2 md:px-8 w-[95%] flex justify-between items-center font-medium text-sm md:text-lg">
                    <div>
                        <h4>{item.companyName}</h4>
                        <span className={'text-xs md:text-sm'}>{ item.itemsCount } items - { item?.dateLabel }</span>
                    </div>
                    <div>
                        <p className={'float-right'}> { item?.amount } </p> <br/>
                        <p className={'float-right'}> { item?.paymentType } </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
