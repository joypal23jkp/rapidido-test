import React, { useState } from 'react';
import { EyeOffIcon, EyeIcon } from '@heroicons/react/solid'


export default function Input({label = "", type = 'text', placeholder = '', id = "", required = false, onChange}) {

  const [show, setShow] = useState(false);

  return (
    <div className="mt-4">
        <label className='block font-medium text-base text-[#272B30] mb-2' htmlFor={id}>
            { label }
            { required && <span className={'text-red-400'}> *</span> }
        </label>
        <div className='relative'>
         <input
          className={"input" + (type === "password" ? " input_password ": "")}
          id={id} type={type === 'password' && show ? "text" : type} placeholder={placeholder} onChange={onChange} />
          {type === 'password' && (
              <div className="absolute right-3 bottom-1/2 translate-y-3" onClick={() => setShow((s) => !s)}>
                {!show && (<EyeOffIcon className="w-5 h-5 text-[#6F767E]" />)}
                {show && (<EyeIcon className="w-5 h-5 text-[#6F767E]" />)}
             </div>
          )}
        </div>
    </div>
  )
};
