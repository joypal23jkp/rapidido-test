import Image from "next/image";

export function OrderCard({ orderDetails }) {
    return (
        <div className={'border w-[180px] sm:w-[300px]  h-[230px] sm:h-[400px] bg-white rounded-b-lg shadow-md'}>
            <div className={'w-[180px] sm:w-[300px]  h-[180px] sm:h-[320px] relative'}>
                <Image layout={'fill'} className={'absolute rounded-t-lg'} src={orderDetails?.imageUrl} alt={orderDetails?.itemName} />
            </div>
            <h5 className={'w-full sm:text-xl text-center truncate px-4 py-2'}>{ orderDetails?.itemName }</h5>
        </div>
    )
}
