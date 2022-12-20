import React, {useEffect, useState} from 'react'
import Image from 'next/image';
import useCart from '@/hooks/useCart';
import {useRouter} from "next/router";
import CardItem from '@/components/checkout/CardItem';
import ItemSummary from '@/components/checkout/ItemSummary'
import { PlusIcon, XIcon, ArrowLeftIcon } from '@heroicons/react/solid';
import { placeOrder } from "@/api/order";

export default function Checkout() {
    const [summary, setSummary] = useState({
        item_count: 0,
        net_total: 0,
        grand_total: 0,
        extras: [
            {
                title: "Tip",
                value: 'Add',
                isAdditionalCharge: false,
                chargeType: 'none' // fixed, percentage, none
            },
            {
                title: "Tax #1 (12%)",
                value: 12,
                isAdditionalCharge: true,
                chargeType: 'fixed' // fixed, percentage, none
            },
            {
                title: "Tax #1 (25%)",
                value: 25,
                isAdditionalCharge: true,
                chargeType: 'percentage' // fixed, percentage, none
            }
        ]
    });
    const {
        items: cartItems, itemCount: cartItemCount, totalPrice: cartTotalPrice,
        removeItem: removeFromCart, updateQuantity: updateCartItemQuantity
    } = useCart();
    const router = useRouter();

    useEffect(() => {
        setSummary(s => ({...s, item_count: cartItemCount, net_total: cartTotalPrice, grand_total: cartTotalPrice}))
    }, [cartItemCount, cartTotalPrice])

    const removeCartItem = (id) => {
        const cartItem = cartItems.find(item => item.id === id);
        if(cartItem && cartItem.quantity == 1) {
            removeFromCart(cartItem.row_id)
            .then(() => console.log(" Remove From Cart!", cartItem))
            .catch(console.log)
            return;
        }
        updateCartItemQuantity(id, '-')
        .catch(console.log)
    }

  return (
    <div className="bg-[#E5E5E5] min:h-screen w-screen px-4 m-auto">

        <div className="relative h-16 p-4 mb-7">
            <div className="absolute left-0 top-4">
                <ArrowLeftIcon className="w-10 h-10 text-black cursor-pointer" onClick={() => router.back()} />
            </div>
            <div className="font-bold text-4xl text-black text-center">Checkout</div>
        </div>
        {cartItems.map((item,key) => (
            <CardItem
                item={item}
                key={key}
                onPlusClick={() => updateCartItemQuantity(item.id, '+')}
                onMinusClick={() => removeCartItem(item.id)}
            />
        ))}


        <ItemSummary summary={summary}/>

        <div className="mt-10">
            <h1 className="text-4xl text-[#27173E]">Friends on this Order</h1>
            <div className="mb-8 mt-4 flex flex-row">
                <div className="relative w-[150px] h-[185px] overflow-clip rounded-lg bg-white mr-2">
                    <div className="relative w-[150px] h-[150px]">
                        <Image src={"/images/150.png"} layout="fill" objectFit="fill" alt="" />
                    </div>
                    <div className="flex justify-center items-center absolute right-2 top-2 bg-white w-10 h-10 rounded-full">
                        <XIcon className="w-8 h-8 text-black" />
                    </div>
                    <div className="text-center p-2 text-xl">You</div>
                </div>
                <div className="relative w-[150px] h-[185px] overflow-clip rounded-lg bg-white mr-2">
                    <div className="relative w-[150px] h-[150px]">
                        <Image src={"/images/150.png"} layout="fill" objectFit="fill" alt="" />
                    </div>
                    <div className="flex justify-center items-center absolute right-2 top-2 bg-white w-10 h-10 rounded-full">
                        <XIcon className="w-8 h-8 text-black" />
                    </div>
                    <div className="text-center p-2 text-xl">Sofie</div>
                </div>
                <div className="w-[150px] h-[185px] flex justify-center items-center overflow-clip rounded-lg border-[1.5px] border-black">
                    <PlusIcon className="w-10 h-10 text-black" />
                </div>
            </div>

            <button className="p-4 bg-black text-white font-medium text-3xl w-full rounded-lg" onClick={handlePayment}>Pay Now</button>
        </div>
    </div>
  )

    async function handlePayment() {
        const orderSummery = {
            status: 1,
            label: "Online Sales",
            isSplitCheck: false,
            equitySplitCount: 0,
            parkSplitSale: null,
            netTotal: 108.17,
            taxAmount: 100.32,
            tableId: 0,
            tipType: "amount",
            tableName: null,
            amount: 208.49,
            grandTotal: 208.49,
            discount: 0,
            discountAmount: 0,
            tipAmount: 0,
            saleDetails: [],
            salePayments: [
                {
                    paymentMethodId: 0,
                    paymentTypeId: 2,
                    amount: 208.49
                }
            ],
            onlineOrderType: 1,
            verifyfullname: "Habib",
            verifymobile: "6544564565465",
            onlineOrderTypeName: "Take Away",
            deliveryAddress: {}
        };
        cartItems?.map((item, i) => {
           orderSummery["saleDetails"].push({
               LintItemID: item.row_id,
               id: item.id,
               itemid: item.id,
               itemVariationId: 0,
               itemName: item.name,
               variationName: "",
               imageUrl: item.image,
               sellingPrice: item.price,
               retailprice: item.price,
               costprice: item.price,
               tax: 0,
               taxAmount: 0,
               quantity: item.quantity,
               discount: 0,
               discountAmount: 0,
               totalTax: 0,
               total: item.price * item.quantity,
               isCustomItem: 0,
               detailimageurl: item.image,
               originalTaxAmount: 0,
               originalSellingPrice: 6,
               isSplitItem: false,
               equitySplitCount: 0,
               description: "This is a cake",
               note: "",
               categoryid: 20047,
               categoryname: "Dessert",
               hasvariations: false,
               variations: [],
               hasmodifier: false,
               modifiers: []
           })
        });
        const response = await placeOrder(`OrderApp/NewSale?id=196&ordertype=1`, orderSummery);
        console.log(response)
    }
}
