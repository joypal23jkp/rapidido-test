
import {InformationCircleIcon}  from '@heroicons/react/solid'
const NotFound = ({ iconClass = 'w-4 h-4' }) => {
    return <div className={'w-full h-full border-2 rounded-lg border-dashed flex justify-center items-center'}>
        <InformationCircleIcon className={iconClass+ ' text-red-700'} />
    </div>
}
export default NotFound;
