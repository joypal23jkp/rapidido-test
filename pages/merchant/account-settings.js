
import {useState} from "react";
import TopBar from "@/components/TopBar";
import Loading from "@/components/Common/Loading";
import NextLink from 'next/link';
import { Disclosure } from "@headlessui/react";
import {ChevronUpIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";
import {useTranslations} from "next-intl";

const AccountSettings = () => {
    const [isItemLoading] = useState(false);
    const t = useTranslations();
    const router = useRouter();
    const handleContinue = async () => {
        await router.push({
            pathname: "/merchant/add-products"
        });
    }
    const settings = [
        "profile",
        "organisation",
        "payment",
        "modifiers",
        "sections",
        "tables",
        "hardware",
        "cash",
        "tax",
        "delivery",
        "billing"
    ]
    return(
        <>
            <TopBar />
            <div className={'w-full h-full-vh md:max-w-[375px] flex flex-col justify-between  border shadow-md text-center mx-auto'}>
                <div className={'py-6 px-5'}>
                    <h5 className={'text-2xl font-bold my-3'}>{t('title')}</h5>
                    <p className={'text-sm leading-relaxed font-medium'}>
                        {t('summery')}
                    </p>
                </div>
                <div className={'list px-5'}>
                    {
                        settings.map(item => {
                            return <Disclosure key={item} className={'border-1'}>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className="disclosure py-3"
                                        >
                                            <span>{t(`list.${item}.title`)}</span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open ? 'rotate-180 transform' : 'rotate-90'
                                                } h-5 w-5`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            If unhappy with your purchase for any reason, email us
                                            within 90 days and we refund you in full, no questions asked.
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        })
                    }
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
            messages: (await import(`../../lang/marchant/auth/settings/${locale}.json`)).default,
        },
    }
}

export default AccountSettings;
