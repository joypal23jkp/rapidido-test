import * as yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import useAuth from "../../hooks/useAuth";
import TopBar from "../../components/TopBar";
import CustomHead from "../../components/CustomHead";

export default function Verification() {
  const router = useRouter();
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, clientLoginVerification } = useAuth();
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  async function onSubmit(data) {
    setIsLoading(true);
    const schema = yup.object().shape({
      otp: yup.string().required(t("form.error.otp_required")),
    });

    try {
      schema.validateSync(data);
      const payload = data;
      payload.MobileNumber = router.query.q;
      await clientLoginVerification(payload);
      setIsLoading(false);
      resetFormValue();
      router.push("/");
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
    document.getElementById("verification").reset();
  }

  return (
    <div>
      <CustomHead />
      <TopBar />
      <h1 className="font-bold text-2xl text-center mt-6 text-[#272B30]">
        {t("verification_title")}
      </h1>
      <div className="container mx-auto">
        <form id="verification" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-1 flex relative border-b-2 border-gray-300">
            <input
              type="text"
              name="otp"
              className="block w-full py-2 px-2 sm:text-sm border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:bg-none"
              autoComplete="off"
              placeholder={t("form.verification_placeholder")}
              {...register("otp")}
            />
          </div>
          <button
            className="w-full py-4 text-center bg-[#FFDD0E] disabled:bg-[#D9D9D9] mb-4 rounded-md mt-5"
            type="submit"
            disabled={!isDirty || !isValid || isLoading}
          >
            {!isLoading && t("form.verify_button")}
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
        </form>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../lang/client/login/${locale}.json`))
        .default,
    },
  };
}
