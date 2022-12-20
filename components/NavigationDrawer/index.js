import React, {useEffect, useState} from 'react';
import NavItem from './NavItem';
import useAuth from '../../hooks/useAuth';
import { useTranslations } from "next-intl";
import useDrawer from '../../hooks/useDrawer';
import { Transition } from '@headlessui/react';
import { XIcon, TagIcon, ShoppingCartIcon, ReceiptRefundIcon, UserCircleIcon, ArrowCircleRightIcon, CheckCircleIcon, StopIcon} from '@heroicons/react/solid'
import Link from "next/link";
import Avatar from "@/components/Common/Avater";
import { fetchCurrentOrder } from "@/api/order";
import Loading from "@/components/Common/Loading";

const navItems = [
    {
        id: 1,
        render_icon: () => <ShoppingCartIcon className="w-8 h-8 text-white mr-0" />,
        label: "My Current Order",
        href: "/order-details"
    },
    {
        id: 2,
        render_icon: () => <TagIcon className="w-8 h-8 text-white mr-0" />,
        label: "Menu",
        href: "#"
    },
    {
        id: 3,
        render_icon: () => <ReceiptRefundIcon className="w-8 h-8 text-white mr-0" />,
        label: "Receipts",
        href: "/receipt"
    },
    {
        id: 4,
        render_icon: () => <UserCircleIcon className="w-8 h-8 text-white mr-0" />,
        label: "My Profile",
        href: "/profile"
    }
];

export default function NavigationDrawer() {
    const {logout, isAuthenticated, user} = useAuth();
    const {isOpen, hideDrawer} = useDrawer();
    const [currentOrder, setCurrentOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const t = useTranslations("top_menu");
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

    function updateOrderStatus(currentOrder) {
        const statusString =  currentOrder?.orderStatusDone.join(' ');
        orderStatus.map((order, index) => {
            if (String(statusString.toLowerCase()).indexOf(order.name.toLowerCase()) !== -1) {
                const tempOrder = [...orderStatus];
                tempOrder[index] = { name: order.name, status: "done" };
                setOrderStatus(tempOrder);
            }
        });
    }

    useEffect(() => {
        if(isOpen) {
            document.body.style.overflow = 'hidden';
            setLoading(true)
            fetchCurrentOrder().then(response => {
                const currentOrder = response.data.payload?.currentorder;
                setCurrentOrder(currentOrder);
                updateOrderStatus(currentOrder);
                setLoading(false)
            }).catch(error => {
                setCurrentOrder(null)
                setLoading(false)
            })
        } else {
            document.body.style.overflow = "visible";
            setCurrentOrder(null);
        }
    }, [isOpen])

    useEffect(()=> {
        if(!isAuthenticated) {
            hideDrawer();
            setCurrentOrder(null);
        }
    }, [isAuthenticated])

    return (
        <>
            <Transition
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                as='div' className={`fixed inset-0 overscroll-none z-50`}>
                <div className="absolute inset-0 overflow-hidden">

                    <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <section className="absolute inset-y-0 right-0 pl-10 w-[350px] lg:w-[400px] flex">

                        <div className="w-screen max-w-md overflow-y-scroll overflow-x-hidden">
                            <div className="relative min-h-[100vh] flex flex-col space-y-6 py-6 bg-white shadow-xl pb-28">

                                <div className="cursor-pointer flex items-center px-4">
                                    <XIcon className="w-6 h-6 bg-none mr-2" onClick={hideDrawer} />
                                    <h1 className="text-lg font-bold mr-1 lg:mr-2 xl:mr-2 w-[70%] text-ellipsis">{ user?.name }</h1>
                                    <div className="flex justify-end w-[25%]">
                                        <Avatar avatar={user?.imageUrl} avatarClasses={'p-[20px] flex justify-center items-center w-[30px] h-[30px]'} />
                                    </div>
                                </div>
                                {
                                    loading &&
                                    <div className="nav__order_button px-4 min-h-[200px]" onClick={() => alert("Click on Order")}>
                                        <Loading />
                                    </div>
                                }

                                {
                                    !loading && <div className="nav__order_button px-4 min-h-[200px]" onClick={() => alert("Click on Order")}>
                                        {
                                            !currentOrder &&
                                            <span className="font-bold text-xl flex items-center">
                                            Start a New Order <ArrowCircleRightIcon className="w-6 h-6 text-white mr-0" />
                                        </span>
                                        }
                                        {
                                            currentOrder &&
                                            <div className={'w-full text-xs'}>
                                                <h5 className={'text-lg font-medium'}>Current Order Id: #{currentOrder?.orderNumber}</h5>
                                                <p className={'py-3'}>Placed {currentOrder?.dateLabel}</p>
                                                <h1 className={'text-4xl font-bold'}>{currentOrder?.amount}</h1>
                                                <p className={'text-yellow-200 text-lg pt-1 pb-1'}>{currentOrder?.paymentStatus}</p>
                                                <ul className={'w-full flex items-center my-2'}>
                                                    {
                                                        orderStatus.map((item, index) => {
                                                            return <li key={item.name} className={'mr-2 flex items-center'}>
                                                                {
                                                                    item?.status && <CheckCircleIcon className={'w-4 mr-1'} />
                                                                }
                                                                {
                                                                    !item?.status && <StopIcon className={'w-4 mr-1'} />
                                                                }
                                                                { item.name }
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                }

                                {navItems.map((item, key) => {
                                    return (
                                        <Link href={item.href} key={item.href+key}>
                                            <a>
                                                <NavItem icon={item.render_icon()} label={item.label} key={key} onClick={() => {}}/>
                                            </a>
                                        </Link>
                                    )
                                })}
                                <div className="absolute bottom-0 left-0 px-3 py-6 anim__scale__105 w-full">
                                    <button className="bg-primary py-4 px-8 rounded-md text-white font-bold text-lg w-full" onClick={logout}>
                                        {/*{t("menu.logout")}*/}
                                        Logout
                                    </button>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </Transition>
        </>
    )

}
