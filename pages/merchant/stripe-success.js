import {useRouter} from "next/router";
import {useState} from "react";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import {useTranslations} from "next-intl";
import Loading from "@/components/Common/Loading";
import NextLink from 'next/link';
const StripeSuccess = ({ messages }) => {
    const router = useRouter();
    const t = useTranslations();
    const [isItemLoading, setItemLoading] = useState(false);
    const goBackToSettings = async () => {
        await router.push({
            pathname: "/merchant/account-settings"
        });
    }
    return(
        <>
            <TopBar />
            <div className={'w-full md:max-w-[375px] h-full-vh flex flex-col justify-between  border shadow-md text-center mx-auto'}>
                <div className={'py-14 px-5'}>
                    <div className={'w-full flex justify-center'}>
                        <Image src={'/images/success.svg'} alt={'group image'} width={140} height={140} />
                    </div>
                    <h5 className={'text-2xl font-semibold my-5'}>{t('title')}</h5>
                    <p className={'text-sm leading-relaxed font-medium mt-5'}>{ t('description') } </p>
                </div>
                <div className={'p-5'}>
                    <button
                        className="w-full p-4 my-2 text-center font-medium bg-[#FFDD0E] disabled:bg-[#D9D9D9] rounded-md hover:cursor-pointer hover:shadow-md"
                        type="submit"
                        disabled={true}
                    >
                        {!isItemLoading && t('add_items')}
                        {isItemLoading && (
                            <Loading />
                        )}
                    </button>
                    <button
                        className="w-full p-4 my-2 font-medium text-center bg-[#FFDD0E] disabled:bg-[#D9D9D9] rounded-md hover:cursor-pointer hover:shadow-md"
                        disabled={false}
                        onClick={goBackToSettings}
                    >
                        { t('setting') }
                    </button>
                    <div className={'w-full p-4 my-2 text-center disabled:bg-[#D9D9D9] rounded-md hover:cursor-pointer hover:underline'}>
                        <NextLink href={''}>{ t('skip') }</NextLink>
                    </div>
                </div>
            </div>
        </>
    );
}


export async function getServerSideProps({locale}) {
    console.log((await import(`../../lang/marchant/auth/congratulation/${locale}.json`)).default, '----ooooooooooooooooooooooooooooooooo-----')
    return {
        props: {
            messages: (await import(`../../lang/marchant/auth/congratulation/${locale}.json`)).default,
        },
    }
}

export default StripeSuccess;
