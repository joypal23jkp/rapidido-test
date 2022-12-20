import {useRouter} from "next/router";
import {useRef, useState} from "react";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import {useTranslations} from "next-intl";
import Loading from "@/components/Common/Loading";
import NextLink from 'next/link';
const Payout = (message) => {
    const router = useRouter();
    const t = useTranslations();
    const [isItemLoading, setItemLoading] = useState(false);
    const handleContinue = async () => {
        await router.push({
            pathname: "/merchant/stripe-success"
        });
    }
    return(
        <>
            <TopBar />
            <div className={'w-full h-full-vh md:max-w-[375px] flex flex-col justify-between  border shadow-md text-center mx-auto'}>
                <div className={'py-6 px-5'}>
                    <h5 className={'text-2xl font-semibold my-3'}>{t('title')}</h5>
                    <p className={'text-sm leading-relaxed font-light'}>
                        {t('summery')}
                    </p>
                </div>
                <div className={'p-5'}>
                    <button
                        className="w-full p-4 my-2 text-center font-medium bg-[#FFDD0E] disabled:bg-[#D9D9D9] rounded-md hover:cursor-pointer hover:shadow-md"
                        disabled={false}
                        onClick={handleContinue}
                    >
                        {!isItemLoading && t('continue')}
                        {isItemLoading && (
                            <Loading />
                        )}
                    </button>
                    <div className={'w-full p-4 my-2 text-center disabled:bg-[#D9D9D9] rounded-md hover:cursor-pointer hover:underline'}>
                        <NextLink href={''}>{t('skip')}</NextLink>
                    </div>
                </div>
            </div>

        </>
    );
}


export async function getServerSideProps({locale}) {
    return {
        props: {
            messages: (await import(`../../lang/marchant/auth/payout/${locale}.json`)).default,
        },
    }
}

export default Payout;
