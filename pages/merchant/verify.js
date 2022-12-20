import {useRouter} from "next/router";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import VerificationCode from "@/components/pages/merchant/VerificationCode";
import {useTranslations} from "next-intl";

const Verify = () => {
    const router = useRouter();
    const t = useTranslations();
    return(
        <>
            <TopBar />
            <div className={'w-full md:max-w-[375px] h-full-vh border shadow-md text-center mx-auto flex flex-col justify-between'}>
                <div className={'px-8'}>
                    <div className={'w-full flex justify-center'}>
                        <Image alt={'otp-image'} src={'/images/otp.svg'} width={140} height={140} />
                    </div>
                    <h5 className={'text-2xl font-semibold'}>{ t('title') }</h5>
                    <span className={'text-sm leading-relaxed text-[#4F4F4F]'}>{t('description') } { router.query?.mobile }</span>
                </div>
                <div className={'w-full'}>
                    <VerificationCode />
                </div>
            </div>
        </>
    );
}


export async function getServerSideProps({locale}) {
    return {
        props: {
            messages: (await import(`../../lang/marchant/auth/verify/${locale}.json`)).default,
        },
    }
}

export default Verify;
