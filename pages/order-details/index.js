import React, { useEffect, useState } from 'react';
import {useRouter} from "next/router";
import TopBar from "@/components/TopBar";
import {fetchOrderDetails} from "@/api/order";
import {OrderCard} from "@/components/Common/OrderCard";
import {CheckCircleIcon, StopIcon} from "@heroicons/react/solid";
import Loading from "@/components/Common/Loading";
import NotFound from "@/components/Common/NotFound";

export default function OrderDetails() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState([
        {
            name: "OrderConfirmed",
            status: null
        },
        {
            name: "PreparingOrder",
            status: null
        },
        {
            name: "Enjoy",
            status: null
        }
    ]);
    useEffect(() => {
        const accessToken = window.localStorage.getItem("accessToken");
        const user = window.localStorage.getItem("userObject");

        if (!accessToken || !user) {
            router.push('/').then();
        }
    }, []);

    useEffect(() => {
        setLoading(true);
       fetchOrderDetails().then(res => {
           const currentOrder = res.data.payload.order;
           setOrder(currentOrder);
           updateOrderStatus(currentOrder);
           setLoading(false);
       }).catch(() => setLoading(false));
    }, []);

    function updateOrderStatus(currentOrder) {
        const doneStatusString =  currentOrder?.orderStatusDone.join(' ');
        orderStatus.map((order, index) => {
            if (String(doneStatusString.toLowerCase()).indexOf(order.name.toLowerCase()) !== -1) {
                const tempOrder = [...orderStatus];
                tempOrder[index] = { name: order.name, status: "done" };
                setOrderStatus(tempOrder);
            }
        });
    }

    return (
        <>
            <TopBar />
            <div className="w-full min-h-screen bg-[#FBFBFB] p-4">
                <h1 className={'text-xl text-center font-medium my-8 border-b'}>Your Order</h1>
                {
                    loading && <div className={'w-full min-h-screen flex justify-center items-center'}>
                        <Loading className={'w-10 h-10 text-xl'} />
                    </div>
                }
                {
                    (!loading && order) && <div>
                        <div className="orders grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {
                                order && order?.details.map((item, index) => {
                                    return <>
                                        <div className={'flex justify-center'} key={item+index}>
                                            <OrderCard orderDetails={item} />
                                        </div>
                                    </>
                                })
                            }
                        </div>
                        <div className="order-summery w-full my-8">
                            <div className={'w-full flex justify-between'}>
                                <span className={'text-lg font-medium'}>Total Item</span>
                                <span className={'text-lg font-medium'}>{ order?.details.length ?? 0 }</span>
                            </div>
                            <div className={'w-full flex justify-between'}>
                                <span className={'text-lg font-medium'}>Total Amount</span>
                                <span className={'text-lg font-medium'}>{ order?.amount.toFixed(2) ?? 0 }</span>
                            </div>
                            <hr className={'my-4'} />
                            <ul className={'w-full items-center my-2'}>
                                {
                                    orderStatus.map((item, index) => {
                                        return  <li key={item.name+index} className={'mr-2 py-1 flex items-center inline-block'}>
                                            {
                                                item?.status && <CheckCircleIcon className={'w-4 mr-1 text-green-600'} />
                                            }
                                            {
                                                !item?.status && <StopIcon className={'w-4 mr-1 text-gray-400'} />
                                            }
                                            { item.name }
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                }
                {
                    (!loading && !order) &&
                    <div className={'w-3/4 h-[300px] mx-auto'}>
                        <NotFound iconClass={'w-20 h-20'} />
                    </div>
                }

            </div>
        </>
    );
}

export async function getStaticProps({locale}) {
    return {
        props: {
            messages: (await import(`../../lang/home/${locale}.json`)).default
        }
    };
}


