import React, {useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import ArrowRightIcon from '@heroicons/react/solid/ArrowRightIcon';

export default function BottomSection() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({email: "", phone: "", text: ""});
  const [formErrors, setFormErrors] = useState({email: "", phone: "", text: ""});

  function handleContactSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    axios.post('/api/mail', {
        ...formData
    })
    .then(({data: res}) => {
        setIsLoading(false);
        if(!res.success) {
            Swal.fire({
                title: 'Error!',
                text: res.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            return;
        }
        resetFormValue();
    })
    .catch((error) => {
        setIsLoading(false);
        console.error(error);
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    })
    

  }

  function handleInputChange(event, name) {
      if(!['email', 'phone', 'text'].includes(name)) {
          return;
      }
      setFormData({...formData, [name]: event.target.value});
  }

  function resetFormValue() {
      setFormData({email: "", phone: "", text: ""});
  }



  return (
    <section className="bg-green-600 flex flex-col items-center py-10 px-5">
            <h1 className="max-w-[360px] text-2xl font-semibold text-center text-white mb-5 px-4">
              {t("hero.title")} <br/>
              {t("hero.subtitle")}
            </h1>
            <Link href={"/partner/signup"} passHref>
            <div className="flex justify-center items-center mb-6 h-12 w-auto bg-[#FFDD0E] drop-shadow-lg rounded-md py-5 px-[18px] cursor-pointer">
                <p className="font-bold text-[16px]">{t("hero.register_button_text")}</p>
            </div>
            </Link>

           <div className="w-full">
            
                <h1 className="font-bold text-[30px] text-white mb-6">{t("contact.title")}</h1>
                <form className="grid grid-cols-1 gap-3" onSubmit={handleContactSubmit}>
                    <label className="block">
                        <input className={`form_input ${formErrors.email ? 'peer' : '' }`} type="email" placeholder={t("contact.email_placeholder")} required value={formData.email} onChange={(event) => {
                            //error handling part here
                            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                            const email = event.target.value;
                            if(!email.match(regex)) {
                                setFormErrors({...formErrors, email: 'Invalid Email!'});
                            } else {
                                setFormErrors({...formErrors, email: ''});
                            }
                            return handleInputChange(event, 'email')
                        }} />
                        {formErrors.email && (
                        <p className="mt-1 invisible peer-invalid:visible text-red-600 text-sm">
                            Please provide a valid email address.
                        </p>
                        )}
                    </label>
                    <input className="form_input" type="text" placeholder={t("contact.phone_placeholder")} required value={formData.phone} onChange={(event) => handleInputChange(event, 'phone')}/>
                    <textarea className="form_input" placeholder={t("contact.message_placeholder")} required rows={4} value={formData.text} onChange={(event) => handleInputChange(event, 'text')}>
                    </textarea>
                    <button disabled={isLoading} className="bg-[#FFDD0E] py-[14px] rounded flex items-center justify-center" type="submit">
                       {!isLoading && (
                        <p className="font-bold text-2xl mr-2">{t("contact.submit_button_text")}</p>
                       )}
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
                </form>
            
           </div>

        </section>
  )
}
