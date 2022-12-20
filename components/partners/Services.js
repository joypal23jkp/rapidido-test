import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import {findByCompanyId} from '@/api/menu';
import {useTranslations} from 'next-intl';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import useCart from '@/hooks/useCart';
import useAuth from "@/hooks/useAuth";
import {useRouter} from "next/router";

const companyId = 196;

export default function Services() {
    const t = useTranslations("sections");
    const ALL_SERVICE_ITEM_ID = 885;
    const {items: cartItems, totalPrice: cartTotalPrice, addItem: addToCart, removeItem: removeFromCart, clearCart} = useCart();
    const [services, setServices] = useState([]);
    const [cardItems, setCardItems] = useState([]);
    const {isAuthenticated} = useAuth();
    const router = useRouter();
    const { isLoading, isError, data, error } = useQuery(['menu', companyId], ()=> findByCompanyId(companyId));
    useEffect(() => {

        if(data?.status && data?.payload?.data?.quickProducts) {
            setServices(data?.payload?.data?.quickProducts);
        }

    }, [isLoading, data]);

    async function handlePartnerClick() {
        if (!isAuthenticated) {
            await router.push('/partner/signup');
            return;
        }
       await router.push('/checkout');
    }

    function activeOnClick(id) {
        const service = services.find(service => service.itemid === id);
        const cartItem = cartItems.find(item => item.id === id);
        if(cartItem) {
            removeFromCart(cartItem.row_id)
            .then(() => console.log(" Remove From Cart!", cartItem))
            .catch(console.log)
        } else {
            if (service.itemid === ALL_SERVICE_ITEM_ID) {
                clearCart();
            }
            const allServiceExists = cartItems.filter(item => item.id === ALL_SERVICE_ITEM_ID);
            if (allServiceExists.length > 0 && service.itemid !== ALL_SERVICE_ITEM_ID) {
                return;
            }
            addToCart({
                id: service.itemid,
                row_id: service.itemid,
                name: service.name,
                quantity: 1,
                price: service.salesprice,
                image: service.detailimageurl
            })
            .then(() => {
                console.log(service, " Added To cart")

            })
            .catch(console.log);
        }

    }

    function itemAlreadyAdded(id) {
        return cartItems.find(item => item.id === id)
    }

  return (
    <div className="bg-[#CAE6D5] h-full pb-12">
            <div className="container">
                <div className="flex flex-col items-center font-bold text-2xl mb-12">

                    <h1 className="mt-8 mb-5">{t("section_two.title")}</h1>
                    <p className="text-base font-medium text-center mb-6">{t("section_two.subtitle")}</p>

                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 m-auto">

                            {services.map((product, key) => (
                                <div className="bg-white rounded-lg overflow-clip shadow-df flex flex-col justify-between" key={product.itemid}>
                                    <div className="relative flex min-h-[252px] min-w-[335px] items-center justify-center">
                                        <Image className=" rounded-t" src={product.detailimageurl} layout='fill' objectFit='cover' alt={product.name} />
                                    </div>
                                    <div className="pt-2 pb-3 px-4 text-base">
                                        <div className="my-3">
                                            {/* {t(`section_two.types.${product.type}`)} */}
                                            <span className="text-[#111315] font-bold text-[18px]">{product.name}</span>
                                        </div>
                                        <div className="flex justify-between text-base font-medium text-[#010D06]">
                                            <span>{t("section_two.monthly")}</span>
                                            <span>€{product.salesprice}</span>
                                        </div>
                                        <div className="flex justify-between text-base font-medium text-[#010D06]">
                                            <span>{t("section_two.transaction")}</span>
                                            <span>{"1.8%"}</span>
                                        </div>

                                        <button disabled={product['disabled'] ?? false} className={`${itemAlreadyAdded(product.itemid) ? "bg-[#F0FAF4]" : "bg-[#FFDD0E]"} flex justify-center items-center text-black w-full p-3 rounded mt-5`} onClick={(e) => {
                                            activeOnClick(product.itemid)
                                            e.preventDefault()
                                        }}>
                                            {itemAlreadyAdded(product.itemid) && (<CheckCircleIcon className="w-6 h-6 text-green-700 mr-2" />)}
                                            {itemAlreadyAdded(product.itemid) ? t("section_two.activated_button_text") : t("section_two.activate_button_text")}
                                        </button>

                                    </div>
                                </div>
                            ))}
                    </div>

                </div>

                <div>
                    <p className="text-center text-sm font-medium mb-4">{t("section_two.order_confirm_note")} = ${cartTotalPrice}</p>
                    <button onClick={handlePartnerClick} className="bg-[#FFDD0E] text-[#111315] w-full p-3 rounded font-bold shadow-md">
                    {t("section_two.become_partner_button_text")}
                    </button>
                </div>
            </div>
        </div>
  )
}
