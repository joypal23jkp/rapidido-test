import React, {useEffect, useState} from 'react'
import User from "@/api/user";
import {useRouter} from "next/router";
import Avatar from '@/components/user/Avatar';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import ProfileForm from '@/components/user/ProfileForm';

export default function MyOrder() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        mobile: '',
        imageUrl: ''
    });
    const [ render, setRender ] = useState(false);

    useEffect(() => {
        User.getProfile().then(user => {
            user = user.data.payload.user;
            setFormData({
                name: user.name,
                email: user.email,
                mobile: user.mobileNumber,
                imageUrl: user.imageUrl
            });
        }).catch(error => {});
    }, [render])

    function submitProfileData(payload) {
        submit({
            Email: payload.email,
            MobileNumber: payload.email,
            Name: payload.name,
            ImageUrl: formData.imageUrl
        });
    }
    function submit(payload) {
        setLoading(true);
        User.updateProfile( payload ).then((response) => {
            setLoading(false);
            window.localStorage.setItem("userObject", JSON.stringify(response.data.payload.user));
            setRender(!render);
        }).catch(error => { setLoading(false) });
    }

    function submitImage(payload) {
        submit({
            ...formData,
            ImageUrl: payload.imageUrl
        });
    }

    return (
        <div className="bg-[#E5E5E5] min-h-screen w-screen px-4 m-auto">
            <div className="relative h-16 p-4 mb-7">
                <div className="absolute left-0 top-4">
                    <ArrowLeftIcon className="w-10 h-10 text-black cursor-pointer" onClick={() => router.back()} />
                </div>
                <div className="font-medium text-2xl text-black text-center">My Profile</div>
            </div>

            <Avatar
                avatar = {formData?.imageUrl}
                updateImage={submitImage}
            />
            <ProfileForm data={formData} handleSubmit={submitProfileData} loading={loading} setLoading={setLoading} />
        </div>
    )
}

