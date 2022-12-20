import {useRouter} from "next/router";
import CustomHead from "@/components/CustomHead";
import TopBar from "@/components/TopBar";
import React, {useState} from "react";
import {useTranslations} from "next-intl";
import Input from "@/components/forms/Input";
import Select from "../../components/Common/Select";
import Loading from "@/components/Common/Loading";
import * as yup from "yup";
import Swal from "sweetalert2";

const Business = ({ message }) => {
    const router = useRouter();
    const t = useTranslations();
    const [isLoading, setIsLoading] = useState(false);
    const options = [
        'Merchant One',
        'Merchant Two',
        'Merchant Three'
    ]
    const [selectedOption, setOption] = useState(options[0]);
    const [form, setForm] = useState({
        fields: {
            companyName: "",
            companyNumber: "",
            country: "",
            address: "",
            typeOfMerchant: selectedOption,
            phoneNumber: "",
            email: "",
        },
        errors: {
            companyName: "",
            companyNumber: "",
            country: "",
            address: "",
            typeOfMerchant: "",
            phoneNumber: "",
            email: "",
        },
        hasError: false,
    });
    function handleInput(e, type) {
        setForm((f) => ({
            ...f,
            fields: {
                ...f.fields,
                [type]: e.target.value,
            },
        }));
    }
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            await yup.object({
                companyName: yup.string().required(t("form.error.company_name")),
                country: yup.string().required(t("form.error.country")),
                email: yup.string().required(t("form.error.email_address")),
            }).validateSync(form.fields);
            const payload = form.fields;
            // await clientLogin(payload);
            setIsLoading(false);
            resetFormValue();
            await router.push({
                pathname: "/merchant/success",
                query: {q: payload.MobileNumber},
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
        document.getElementById("business").reset();
    }


    return(
        <>
            <CustomHead />

            <TopBar render={" "} />
            <h1 className="font-bold text-2xl text-center mt-6 text-[#272B30]">
                {t("title")}
            </h1>
            <div className="container mx-auto">
                <form id="business" onSubmit={handleSubmit}>
                    <Input
                        label={t("form.label.company_name")}
                        type={'text'}
                        required
                        placeholder="Enter company name"
                        id="company_name"
                        onChange={(e) => handleInput(e, "companyName")}
                    />
                    <Input
                        label={t("form.label.company_number")}
                        type="text"
                        placeholder="Enter company number"
                        id="company_number"
                        onChange={(e) => handleInput(e, "companyNumber")}
                    />
                    <Input
                        label={t("form.label.country")}
                        type="text"
                        required
                        placeholder="Sweden"
                        id="country"
                        onChange={(e) => handleInput(e, "country")}
                    />
                    <Input
                        label={t("form.label.address")}
                        type="text"
                        placeholder="Street number, postcode, geo location"
                        id="address"
                        onChange={(e) => handleInput(e, "address")}
                    />
                    <Select
                        label={t("form.label.type_of_merchant")}
                        options={options}
                        selectedItem={selectedOption}
                        onSelectedItemChanged={
                            (event) => {
                                setOption(event);
                                handleInput({target: { value: event }}, "typeOfMerchant")
                            }
                        }
                    />

                    <Input
                        label={t("form.label.phone_number")}
                        type="text"
                        placeholder="+1934344343434"
                        id="number"
                        onChange={(e) => handleInput(e, "phoneNumber")}
                    />

                    <Input
                        label={t("form.label.email_address")}
                        type="email"
                        required
                        placeholder="example@mail.com"
                        id="email"
                        onChange={(e) => handleInput(e, "email")}
                    />

                    <p className={'py-4 text-center'}>
                        {t("summery")}
                    </p>

                    <button
                        className="w-full py-4 text-center bg-[#FFDD0E] disabled:bg-[#D9D9D9] mb-4 rounded-md mt-5"
                        type="submit"
                        disabled={false}
                    >
                        {!isLoading && t("form.submit_button")}
                        {isLoading && (
                            <>
                                <Loading />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
export default Business;

export async function getServerSideProps({locale}) {
    return {
        props: {
            messages: (await import(`../../lang/marchant/auth/business-details/${locale}.json`)).default,
        },
    }
}
