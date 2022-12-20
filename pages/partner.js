import Link from 'next/link';
import Head from 'next/head';
import React, {useState} from 'react';
import {useRef, useEffect} from 'react';
import { useRouter } from "next/router";
import {useTranslations} from 'next-intl';

import TopBar from '@/components/TopBar';
import {grandesDummyData} from "../data/index";
import Services from '@/components/partners/Services';
import OptionalHardware from '@/components/partners/OptionalHardware';
import BottomSection from '@/components/partners/BottomSection';

export default function Partner() {
    const URI = useRef();
    const router = useRouter();
    const t = useTranslations();

    useEffect(() => {
        URI.current = window.location.href;
    }, []);


  function sectionHero() {
      return (
          <>
            <h1 className="max-w-[360px] text-2xl font-semibold text-center text-white mb-5 px-4">
                {t("hero.title")}
            </h1>
            <p className={'text-[14px] text-white pb-3 tracking-wider'}>
                {t("hero.subtitle")}
            </p>
            <Link href={"/partner/signup"} passHref>
                <div className="flex justify-center items-center mb-6 h-12 w-auto bg-[#FFDD0E] drop-shadow-lg rounded-md py-5 px-[18px] cursor-pointer">
                    <div className="font-bold text-[16px]">{t("hero.register_button_text")}</div>
                </div>
            </Link>
            <p className="text-sm md:text-base lg:text-xl xl:text-xl 2xl:text-2xl text-white">
                {t("hero.tagline")}
            </p>
          </>
      )
  }


  return (
    <>
    <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>{t("meta.title")}</title>
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="3 days" />
        <meta name="title" content={t("meta.title")} />
        <meta name="description" content={t("meta.description")} />
        <link rel="icon" href="/favicon.png"  type="image/png" sizes="16x16" />
        <meta name="author" content="Faisal Ahmed" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URI.current} />
        <meta property="og:title" content={t("meta.title")} />
        <meta property="og:description" content={t("meta.description")} />
        <meta property="og:image" content={`https://rapedido.es/meta-image.png`} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content={`https://rapedido.es/meta-image.png`} />
        <meta property="twitter:url" content={URI.current} />
        <meta property="twitter:title" content={t("meta.title")} />
        <meta property="twitter:description" content={t("meta.description")} />
        <meta property="twitter:image" content={`https://rapedido.es/meta-image.png`} />
    </Head>
    <TopBar />
    <div className="w-full bg-[#FBFBFB]">
        <section className="bg-[rgb(51,56,63)] relative overflow-hidden flex flex-col items-center py-[50px]">
            <>
            <img src='/images/hero-bg.png' className="h-full w-full mix-blend-overlay absolute inset-0 object-cover" alt="hero image" />
            {sectionHero()}
            </>

        </section>

         {/** Digital, effective & simple */}
         <div className="container flex flex-col items-center mb-8">
                <h1 className="font-bold text-2xl mb-5 mt-8">{t("sections.section_one.title")}</h1>
                <p className="text-base font-medium mb-10 text-center">{t("sections.section_one.sub_title")}</p>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                    {new Array(3).fill('').map((i, k) => (
                        <div className="flex flex-col max-w-[335px]" key={k}>
                            <div className="flex items-center mb-3">
                                <div className="bg-[#FFDD0E] rounded-md px-3 py-2 font-semibold text-base text-center">{" 0"+ (k + 1)}</div>
                                <div className="ml-3 font-semibold text-xl">{t(`sections.section_one.text_${k+1}`)}</div>
                            </div>
                            <img className="rounded" src={"/images/digital/step-" + (k + 1) +".jpg"} alt={`step-${k + 1}`} />
                        </div>
                    ))}
                </div>

            </div>
        {/** All in one & flexible */}
        <Services />

        {/** offer section */}
        <div className="container pb-12">
            <div className="relative flex flex-col items-center justify-center pb-12 bg-primary rounded-lg mt-28">
                <div className="absolute top-[-65px] z-10">
                    <div className="relative w-[194px] h-[115px] bg-no-repeat bg-[url('/images/offer-card.svg')] object-cover">
                        {/* <img className="w-[193px] h-[111px]" src="/images/offer-card.svg" alt="offer" /> */}
                        <p className="absolute top-[40%] right-4 max-w-[80px] font-bold text-base">For All Services</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center pt-16">
                    <p className="font-semibold text-2xl text-white mb-4 text-center">{t("sections.section_offer.title")}</p>
                    <Link href="https://swype-react.web.app/signup" passHref>
                    <button className="font-semibold text-base bg-[#FFDD0E] text-black rounded px-5 py-4 shadow-md">{t("sections.section_offer.button_text")}</button>
                    </Link>
                </div>
            </div>
        </div>


        {/** Grandes funciones */}
        <div className="flex flex-col items-center bg-[#33383F] py-[54px]">
            <h1 className="text-center text-white font-bold text-2xl mb-6">{t("sections.section_three.title")}</h1>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-flow-col-2 xl:grid-flow-col-2 text-white px-8">
                {grandesDummyData[router.locale].map((g, key) => (
                    <div key={key}>
                        <h1 className="font-bold text-xl mb-4">{g.section}</h1>
                        <div className={(grandesDummyData.length - 1 )!== key ? "mt-4 mb-4" : "mt-4"}>
                            {g.list.map((text, k) => (
                                <li className="text-sm" key={k}>{text}</li>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>

        {/** Optional Hardware */}
        <OptionalHardware />

        {/** bottom form */}

        <BottomSection />

    </div>
    </>
  );
}

export async function getStaticProps({locale}) {
    return {
      props: {
        messages: (await import(`../lang/partner/${locale}.json`)).default
      }
    };
}
