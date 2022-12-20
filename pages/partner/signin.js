import React, { useRef, useEffect, useState } from "react";
import * as yup from "yup";
import Link from "next/link";
import Head from "next/head";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import useAuth from "../../hooks/useAuth";
import TopBar from "../../components/TopBar";
import Input from "../../components/forms/Input";
import {signIn, useSession, signOut} from "next-auth/react";

export default function SingIn({ message }) {
  const { login } = useAuth();
  const t = useTranslations();
  const URI = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    fields: {
      username: "",
      password: "",
      deviceid: +new Date(),
    },
    errors: {
      email: null,
      password: null,
    },
    hasError: false,
  });

  useEffect(() => {
    URI.current = window.location.href;
  }, []);

  function handleInput(e, type) {
    setForm((f) => ({
      ...f,
      fields: {
        ...f.fields,
        [type]: e.target.value,
      },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const schema = yup.object().shape({
      username: yup.string().required(t("form.error.email_required")).email(),
      password: yup
        .string()
        .min(6, t("form.error.password_length"))
        .required(t("form.error.password_required")),
    });

    try {
      schema.validateSync(form.fields);
      const payload = form.fields;
      const response = await login(payload);
      setIsLoading(false);

      Swal.fire(
        "Logic success!",
        "Please Wait We Will redirect to dashboard",
        "success"
      );
      resetFormValue();
      window.location.href = `https://swype-react.web.app/login?token=${response.payload.user.token}`;
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
    setForm({
      fields: {
        username: "",
        password: "",
        deviceid: +new Date(),
      },
      errors: {
        email: null,
        password: null,
      },
      hasError: false,
    });
    document.getElementById("signin").reset();
  }
  const { data: session, status } = useSession()
  useEffect(() => {
    if(session) {
      console.log(session)
      Swal.fire('Login Successfully - ' + session.user.name).then(() => {
        signOut().then(() => {});
      })
    }
  }, [session]);

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
        <meta
          property="og:image"
          content={`https://rapedido.es/meta-image.png`}
        />

        {/* <!-- Twitter --> */}
        <meta
          property="twitter:card"
          content={`https://rapedido.es/meta-image.png`}
        />
        <meta property="twitter:url" content={URI.current} />
        <meta property="twitter:title" content={t("meta.title")} />
        <meta property="twitter:description" content={t("meta.description")} />
        <meta
          property="twitter:image"
          content={`https://rapedido.es/meta-image.png`}
        />
      </Head>
      <TopBar render={" "} />
      <h5 className={'font-medium text-md text-center my-4'}>Sign in faster with</h5>
      <SocialAuth />
      <h1 className="font-bold text-2xl text-center mt-6 text-[#272B30]">
        {t("title")}
      </h1>
      <div className="container mx-auto">
        <form id="signin" onSubmit={handleSubmit}>
          <Input
            label={t("form.label.email_address")}
            type="email"
            placeholder="example@mail.com"
            id="email"
            onChange={(e) => handleInput(e, "username")}
          />
          <Input
            label={t("form.label.password")}
            type="password"
            placeholder=". . . . . ."
            id="password"
            onChange={(e) => handleInput(e, "password")}
          />
          <button
            className="w-full py-4 text-center bg-[#FFDD0E] disabled:bg-[#D9D9D9] mb-4 rounded-md mt-5"
            type="submit"
            disabled={
              !(form.fields.username && form.fields.password) || isLoading
            }
          >
            {!isLoading && t("form.submit_button")}
            {isLoading && (
              <>
                <svg
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </>
            )}
          </button>
          {/* <p className="mb-4 text-sm text-gray-600 text-center">Or continue with social account</p> */}
          <p className="mb-4 text-sm text-[#4F4F4F] text-center">
            {t("form.already_have_account")}{" "}
            <Link href={"/partner/signup"} passHref>
              <span className="text-[#1CA753] cursor-pointer">
                {t("form.sign_up")}
              </span>
            </Link>
          </p>
          <p className="mb-4 text-sm text-[#4F4F4F] text-center">
            <Link href={"/reset/password"}>{t("form.forgot_password")}</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export function SocialAuth() {
  return(
      <>
        <div className={'flex w-[90%] md:w-[50%] mx-auto gap-4'}>
          <button className={'flex justify-center items-center w-1/2 border rounded font-semibold text-sm text-[#518EF8] px-[42px] py-4'}  onClick={async () => { await signIn('google') }}>
            <span className={'bg-[#0000ff38] p-1 rounded-full mr-2'}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_720_14424)">
                  <path d="M2.21621 6.04326L1.86812 7.34272L0.595879 7.36963C0.215664 6.66441 0 5.85756 0 5.00014C0 4.17102 0.201641 3.38914 0.559062 2.70068H0.559336L1.69199 2.90834L2.18816 4.0342C2.08432 4.33695 2.02771 4.66195 2.02771 5.00014C2.02775 5.36717 2.09424 5.71883 2.21621 6.04326Z" fill="#FBBB00"/>
                  <path d="M9.91209 4.06592C9.96951 4.36838 9.99945 4.68074 9.99945 4.99998C9.99945 5.35795 9.96182 5.70713 9.89012 6.04395C9.64672 7.1901 9.01072 8.19092 8.12969 8.89916L8.12941 8.89889L6.70277 8.8261L6.50086 7.56565C7.08547 7.22279 7.54234 6.68625 7.78301 6.04395H5.10938V4.06592H7.82201H9.91209Z" fill="#518EF8"/>
                  <path d="M8.12976 8.89873L8.13004 8.899C7.27318 9.58773 6.18471 9.99982 4.99982 9.99982C3.0957 9.99982 1.44021 8.93555 0.595703 7.36934L2.21604 6.04297C2.63828 7.16988 3.72537 7.97209 4.99982 7.97209C5.54762 7.97209 6.06082 7.824 6.50119 7.56549L8.12976 8.89873Z" fill="#28B446"/>
                  <path d="M8.19102 1.15109L6.57123 2.47719C6.11547 2.1923 5.57672 2.02773 4.99953 2.02773C3.69623 2.02773 2.58881 2.86674 2.18771 4.03406L0.558867 2.70055H0.558594C1.39074 1.09615 3.06711 0 4.99953 0C6.21272 0 7.32508 0.432148 8.19102 1.15109Z" fill="#F14336"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_720_14424">
                  <rect width="10" height="10" fill="white"/>
                  </clipPath>
                  </defs>
              </svg>
            </span>
            Google
          </button>
          <button className={'flex justify-center items-center w-1/2 border rounded font-semibold text-sm text-[#3B5999] px-[42px] py-4'}  onClick={async () => await signIn('facebook')}>
            <span className={'bg-[#3B5999] rounded-full mr-2 w-5 h-5 p-[7px] flex justify-center items-center'}>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66563 1.66042H5.57854V0.0704167C5.42104 0.04875 4.87938 0 4.24854 0C1.36021 0 2.14604 3.27083 2.03104 3.75H0.578125V5.5275H2.03063V10H3.81146V5.52792H5.20521L5.42646 3.75042H3.81104C3.88938 2.57375 3.49396 1.66042 4.66563 1.66042Z" fill="white"/>
              </svg>
            </span>
            Facebook
          </button>
        </div>
      </>
  );
}

export async function getServerSideProps({locale}) {
  return {
    props: {
      messages: (await import(`../../lang/partner/signin/${locale}.json`))
          .default,
    },
  }
}
