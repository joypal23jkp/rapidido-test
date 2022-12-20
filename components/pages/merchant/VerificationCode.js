import Loading from "@/components/Common/Loading";
import {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "next/router";
import useAuth from "@/hooks/useAuth";
import * as yup from "yup";
import Swal from "sweetalert2";
const VerificationCode = ({ messages }) => {
    const t = useTranslations();
    const [vCodes, setVCodes] = useState([
        {
            id: 1,
            code: ''
        },
        {
            id: 2,
            code: ''
        },
        {
            id: 3,
            code: ''
        },
        {
            id: 4,
            code: ''
        },
        {
            id: 5,
            code: ''
        },
        {
            id: 6,
            code: ''
        },
    ]);
    const router = useRouter();
    const [time, setTime] = useState(90);
    const [isLoading, setIsLoading] = useState(false);
    const verificationCodes = useRef(null);
    const { isAuthenticated, clientLoginVerification } = useAuth();
    const verify = async (e) => {
        e.preventDefault();
        const data = {
            otp: vCodes.reduce((item, carry) => {
                return item.concat(carry.code);
            }, "")
        };
        setIsLoading(true);
        const schema = yup.object().shape({
            otp: yup.string().required(t("form.error.otp_required")),
        });

        try {
            schema.validateSync(data);
            const payload = data;
            payload.MobileNumber = router.query?.mobile;
            // await clientLoginVerification(payload);
            setIsLoading(false);
            clear();
            await router.push("/merchant/business");
        } catch (error) {
            setIsLoading(false);
            await Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    }
    const onButtonClick = (item) => {
        const codes = [...vCodes];
        const emptyIndex = codes.findIndex(code => !code.code);
        if (emptyIndex < 0) return;
        codes[emptyIndex].code = item
        setVCodes(codes)
        return null;
    }
    const onBackPress = () => {
        const codes = [...vCodes];
        const emptyIndex = codes.findIndex(code => !code.code);
        if (emptyIndex < 0) {
            codes[codes.length - 1].code = '';
        }else if (emptyIndex === 0) {
            return;
        }else {
            codes[emptyIndex - 1].code = '';
        }
        setVCodes(codes)
        return null;
    }
    const clear = () => {
        let codes = [...vCodes];
        codes = codes.map(code => {
            return {
                id: code.id,
                code: ''
            }
        });
        setVCodes(codes);
    }
    const handleInputUpdate = (e, i) => {
            const codes = [...vCodes];
            const text = e.nativeEvent?.data;
            codes[i].code = text ?? '';
            setVCodes(codes);
    }
    const secondsToMinSecPadded = (time) => {
        const minutes = "0" + Math.floor(time / 60);
        const seconds = "0" + (time - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    };

    useEffect(() => {
        if (time > 0) {
            setTimeout(() => {
                secondsToMinSecPadded()
                setTime(time-1);
            }, 1000);
        }
    }, [time])

    return (
      <>
        <form>
            <div className={'m-5'}>
                <div className={'verification-codes grid grid-cols-6 gap-4 py-4'} ref={verificationCodes}>
                    {
                        vCodes.map((item, i) => {
                            return (
                                <input type={'text'} name={'input-'+i}
                                       onChange={(e) => handleInputUpdate(e, i)}
                                       key={item.id} value={item.code} className={'bg-gray-100 px-3 pt-3 pb-2 rounded text-center'} />
                            )
                        })
                    }
                </div>
                <p className={'text-sm leading-relaxed text-[#4F4F4F] font-medium'}>{t('reset')} { secondsToMinSecPadded(time) }</p>
                {
                    (time === 0) &&
                    <span className={'text-normal leading-relaxed text-gray-400 cursor-pointer hover:text-gray-700 hover:font-medium hover:underline'}>{t('resend')}</span>
                }
                <button
                    className="w-full p-4 my-4 text-center bg-[#FFDD0E] disabled:bg-[#D9D9D9] rounded-md hover:cursor-pointer hover:shadow-md"
                    type="submit"
                    onClick={verify}
                    disabled={false}
                >
                    {!isLoading && t('form.verify')}
                    {isLoading && (
                        <Loading />
                    )}
                </button>
            </div>
            <div className={'grid grid-cols-3 p-4 bg-verificationButtonColor mt-4'}>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(1);
                }}>1</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(2);
                }}>2</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(3);
                }}>3</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(4);
                }}>4</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(5);
                }}>5</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(6);
                }}>6</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(7);
                }}>7</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(8);
                }}>8</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(9);
                }}>9</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    clear('close');
                }}>
                    <svg width="46" height="36" viewBox="0 0 46 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42.375 0.880005H13.6328C12.6377 0.880005 11.7073 1.37343 11.1492 2.19723L0.0625 18.56L11.1462 34.4372C11.7073 35.241 12.6258 35.72 13.6061 35.72H42.375C44.0319 35.72 45.375 34.3769 45.375 32.72V3.88C45.375 2.22315 44.0319 0.880005 42.375 0.880005Z" fill="#E4E4E5"/>
                        <path d="M36 11.4059L33.7905 9.20001L26.625 16.3541L19.4595 9.20001L17.25 11.4059L24.4155 18.56L17.25 25.7141L19.4595 27.92L26.625 20.766L33.7905 27.92L36 25.7141L28.8345 18.56L36 11.4059Z" fill="#131313"/>
                    </svg>
                </button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onButtonClick(0);
                }}>0</button>
                <button className={'btn'} onClick={(event) => {
                    event.preventDefault()
                    onBackPress();
                }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="23.9785" cy="24.04" rx="23.4375" ry="23.4" fill="#E4E4E5"/>
                        <path d="M31.6814 19.0863V23.4653H17.2077L21.1551 19.5242L19.62 17.9916L13.041 24.56L19.62 31.1284L21.1551 29.5958L17.2077 25.6547H33.8744V19.0863H31.6814Z" fill="#131313" stroke="#131313"/>
                    </svg>
                </button>
            </div>
        </form>
      </>
    );
}
export default VerificationCode;



export async function getServerSideProps({locale}) {
    return {
        props: {
            messages: (await import(`../../../lang/marchant/auth/verify/${locale}.json`)).default,
        },
    }
}
