import React from 'react';
import {useTranslations} from 'next-intl';
import {hardwareDummyData} from '../../data/index';
import { ShoppingCartIcon } from '@heroicons/react/outline'
import Image from 'next/image';



export default function OptionalHardware() {
    const t = useTranslations();

  return (
    <div className="container py-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-10">{t("sections.section_four.title")}</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 m-auto">
            {hardwareDummyData.map((h, key) => (
                <div className="max-w-[335px] h-auto flex items-center flex-col bg-white rounded-lg shadow-df p-1 overflow-clip" key={key}>
                    <div className="bg-[#F8F8F8] relative rounded-tr-lg rounded-tl-lg w-full h-full">
                        <img className="w-full h-full object-cover" src={h.image} alt={h.type} />
                    </div>
                    <div className="bg-white w-full text-[#272B30] p-4 rounded-b-md">
                        <p className="font-bold text-xl mb-2">{t(`sections.section_four.types.${h.type}`)}</p>
                        <div className="flex flex-col">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">{t(`sections.section_four.payment.monthly`)}:</span>
                                <span className="text-sm font-medium">€{h.price_monthly}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">{t(`sections.section_four.payment.full_payment`)}:</span>
                                <span className="text-sm font-medium">€{h.price_full_payment}</span>
                            </div>
                        </div>
                        <button className="flex justify-center items-center w-full p-[10px] border border-[#E5E5E5] rounded-md mt-4 cursor-pointer text-[#111315]">
                            <ShoppingCartIcon className="h-8 w-8 mr-2" />
                            <p className="font-medium">{t(`card.add_card_text`)}</p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
