import React, {useRef, useEffect, useState} from 'react'
import {useTranslations} from 'next-intl';
import TopBar from '../../components/TopBar';
import Input from '../../components/forms/Input';
import Link from 'next/link';
import Head from 'next/head';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { MerchantForgotPassword } from '../../app/api/merchant';

export default function Password() {
  const t = useTranslations();
  const URI = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({fields: {
          email: "",
          deviceid: + new Date()
        }, 
        errors:{
          email: null,
        }, 
        hasError: false
      });
  
  useEffect(() => {
    URI.current = window.location.href;
  }, []);

  function handleInput(e, type) {
    setForm(f => ({...f, fields: {
      ...f.fields,
      [type]: e.target.value}
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const schema = yup.object().shape({
      email: yup.string().required(t('form.error.email_required')).email(),
    });

    try {

      schema.validateSync(form.fields);
      const payload = form.fields;
      const response = await MerchantForgotPassword(payload);
      setIsLoading(false);

      Swal.fire(
        response.message,
        '',
        'success'
      );
      resetFormValue();
    

    } catch(error) {
      setIsLoading(false);
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
    
  }

  function resetFormValue() {
    setForm({fields: {
        email: "",
        deviceid: + new Date()
      }, 
      errors:{
        email: null
      }, 
      hasError: false
    });
    document.getElementById('forgot').reset();
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
    
      <TopBar/>
      <h1 className="font-bold text-2xl text-center mt-6 text-[#272B30]">{t('title')}</h1>
      <div className="container mx-auto">
        <form id='forgot' onSubmit={handleSubmit}>
          <Input label={t('form.label.email_address')} type='email' placeholder='example@mail.com' id='email' onChange={e=> handleInput(e, 'email')}/>
          <button
            className="w-full py-4 text-center bg-[#FFDD0E] disabled:bg-[#D9D9D9] mb-4 rounded-md mt-5" 
            type='submit'
            disabled={!form.fields.email || isLoading}
            >
              {!isLoading && t('form.submit_button')}
              {isLoading && (
                            <>
                                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                Loading...
                            </>
                        )}
            </button>
          <p className="mb-4 text-sm text-[#4F4F4F] text-center">{t('form.already_have_account')} <Link href={'/partner/signin'}>
            <span className="text-[#1CA753] cursor-pointer">{t('form.sign_in')}</span></Link>
          </p>
        </form>
      </div>
    </>
  )
}


export async function getStaticProps({locale}) {
    return {
      props: {
        messages: (await import(`../../lang/reset/password/${locale}.json`)).default
      }
    };
  }