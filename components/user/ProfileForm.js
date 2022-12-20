import React, {useEffect, useState} from "react";

export default function ProfileForm({ data = {}, handleSubmit, loading }) {

    const [state, setState] = useState(data);
    // const [buttonValue, setButtonValue] = useState( );
    useEffect(() => {
        setState({
            name: data?.name,
            email: data?.email,
            mobile: data.mobile,
            imageUrl: data.imageUrl
        })
    }, [data]);

    const onsubmit = () => {
        if (state.mobile) {
            handleSubmit(state);
        }
    }

    return (
        <div className="mx-auto my-4">
            <form onSubmit={handleSubmit}>
                <div className="rounded-xl shadow-md overflow-hidden bg-white p-2 md:p-4 text-black">
                    <label>
                        <span className={'text-xs'}> Name: </span> <br/>
                        <input
                            type="text"
                            className={'w-full border-b focus:outline-0 focus:border-black my-2'}
                            placeholder={'enter your name'}
                            defaultValue={state?.name ?? ''}
                            onChange={(event) => setState({...state, name: event.target.value})}
                        />
                    </label>
                    <br/>
                    <label>
                       <span className={'text-xs'}> Email:</span> <br/>
                        <input
                            type="email"
                            className={'w-full border-b focus:outline-0 focus:border-black my-2'}
                            defaultValue={state?.email}
                            placeholder={'enter your email'}
                            onChange={(event) => setState({...state, email: event.target.value})}
                        />
                    </label>
                    <br/>
                    <label>
                        <span className={'text-xs'}> Mobile:</span> <br/>
                        <input type="text" className={'w-full border-b focus:outline-0 focus:border-black my-2'} value={data?.mobile} readOnly={true} />
                    </label>
                </div>
                <input
                    type="button"
                    onClick={onsubmit}
                    className={'rounded-xl shadow-md overflow-hidden bg-black my-4 p-2 md:p-4 text-white w-full cursor-pointer active:bg-gray-800'}
                    value={loading ? 'Updating...': 'Save'}
                />
            </form>
        </div>
    );
}
