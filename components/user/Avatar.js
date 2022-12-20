import React, {useRef} from "react";
import Image from 'next/image';
import User from "@/api/user";

export default function Avatar({ avatar = null, updateImage, avatarClasses = '', modalClasses = '' }) {
    const fileRef = useRef();
    return (
        <>
            <div className={'flex justify-center items-center w-full sm:w-1/2 md:w-1/3 h-[200px] mx-auto rounded-xl shadow-md overflow-hidden bg-white p-8 '+modalClasses} >
                <div className={'relative bg-gray-100 w-[100px] h-[100px] rounded-full text-gray-700 p-8 hover:border cursor-pointer '+avatarClasses}>

                    {
                        !avatar && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>

                    }
                    {
                        avatar &&
                        <Image src={avatar} layout="fill" className={'rounded-full'} objectFit="cover" alt={"avatar"} />

                    }
                    <input type="file" ref={fileRef} onChange={ (e) => handleChange(e.target) } className={'custom-file-input text-transparent'} />
                </div>
            </div>
        </>
    )
    function handleChange()
    {
        const files = fileRef.current.files[0];
        fileRef.current.value = '';
        const formData = new FormData();
        formData.append('file', files);

        User.updateProfileImage(formData).then(response => {
            updateImage({ imageUrl: response?.data?.payload?.image?.url });
        }).catch(err => {})
    }
}


