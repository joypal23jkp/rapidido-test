import React, {useRef, useState, Fragment} from 'react'
import {useTranslations} from 'next-intl';
import Head from 'next/head';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import {Listbox, Transition} from "@headlessui/react";
import Image from "next/image";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import Loading from "@/components/Common/Loading";
import useAuth from "@/hooks/useAuth";

export default function SingUp({ message }) {
    const t = useTranslations();
    const URI = useRef();
    const router = useRouter();
    const { clientLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm();

    const flags = [
        {
            id: "es",
            country_code: "+34",
            icon: "/icons/flags/se.png",
            label: "Spain (España) +34",
            placeholder: "612 34 56 78",
        },
        {
            id: "sw",
            country_code: "+46",
            icon: "/icons/flags/sw.png",
            label: "Sweden (Sverige) +46",
            placeholder: "070-123 45 67",
        },
        {
            id: "us",
            country_code: "+1",
            icon: "/icons/flags/us.png",
            label: "United State +1",
            placeholder: "(201) 555-0123",
        },
        {
            id: "bd",
            country_code: "+88",
            icon: "/icons/flags/bd.png",
            label: "Bangladesh +880",
            placeholder: "01788656451",
        },
    ];
    const [selected, setSelected] = useState(flags[0]);

    async function onSubmit(data) {
        setIsLoading(true);
        const schema = yup.object().shape({
            MobileNumber: yup.string().required(t("form.error.phone_required")),
        });

        try {
            schema.validateSync(data);
            const payload = data;
            payload.MobileNumber = selected.country_code + payload.MobileNumber.trim();
            await clientLogin(payload);
            setIsLoading(false);
            resetFormValue();
            router.push({
                pathname: "/merchant/verify",
                query: { mobile: payload.MobileNumber },
            });
        } catch (error) {
            setIsLoading(false);
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    }

    function resetFormValue() {
        document.getElementById('signup').reset();
    }


    return (
        <>
            <Head>
                {/* <!-- Primary Meta Tags --> */}
                <title>{t("meta.title")}</title>
                <meta name="robots" content="index, follow" />
                <meta name="revisit-after" content="3 days" />
                <meta name="title" content={t("meta.title")} />
                <meta name="keywords" content={t("meta.keywords")} />
                <meta name="description" content={t("meta.description")} />
                <link rel="icon" href="/favicon.png" type="image/png" sizes="16x16" />
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
            <h1 className="font-bold text-2xl text-center my-6 text-[#272B30]">{t('title')}</h1>
            <div className="container mx-auto">
                <form id='signup' onSubmit={handleSubmit(onSubmit)}>
                    <div className={'flex border-2 rounded border-[#6F767E]'}>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1 flex items-center w-[120px]">
                                <Listbox.Button className="relative flex justify-center items-center cursor-default py-2 pl-4 focus:outline-none">
                                    <div className="relative w-8 h-8">
                                        <Image
                                            src={selected.icon}
                                            layout={'fill'}
                                            alt={selected.id}
                                        />
                                    </div>
                                    <span className={'font-medium text-sm ml-2 mr-1'}>{ String(selected.id).toUpperCase() }</span>
                                    <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-[270px] rounded-md bg-white py-1 text-base shadow-lg ring-1 focus:outline-none">
                                        {flags.map((flag, personIdx) => (
                                            <Listbox.Option
                                                key={personIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-1 px-4${
                                                        active
                                                            ? "bg-amber-100 text-amber-900"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                value={flag}
                                            >
                                                {({ selected }) => (
                                                    <div className="flex">
                                                        <div className="relative w-10 h-10 mx-2">
                                                            <Image
                                                                src={flag.icon}
                                                                layout="fill"
                                                                alt={flag.id}
                                                            />
                                                        </div>
                                                        <p>{flag.label} </p>
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                        <input type="text" placeholder={selected.placeholder} name={'phone_number'} className={'outline-0 w-full'} {...register("MobileNumber")}/>
                    </div>
                    <button
                        className="w-full py-4 text-center bg-[#FFDD0E] disabled:bg-[#D9D9D9] my-4 rounded-md font-bold"
                        type='submit'
                        disabled={!isDirty || !isValid || isLoading}
                    >
                        {!isLoading && t('form.next_button')}
                        {isLoading && <Loading /> }
                    </button>
                </form>
            </div>
        </>
    )
}


export async function getServerSideProps({locale}) {
    return {
        props: {
            messages: (await import(`../../lang/marchant/auth/signup/${locale}.json`)).default,
        },
    }
}
