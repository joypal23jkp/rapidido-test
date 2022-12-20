import { useRouter } from 'next/router';
import React, {Fragment, useEffect, useState} from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import useLocal from '../hooks/useLocal';

export default function LocalSwitch({className, localList}) {
    const router = useRouter();
    const [local, setLocal] = useLocal(router.locale);
    const [localListVisible, setLocalListVisible] = useState(false);
    const [availableLocals, setAvailableLocal] = useState([]);

    useEffect(() => {
        setAvailableLocal(localList.filter(l => l.id !== local.id));
    }, [])

    function toggleLocal(locale) {
        setLocal(locale);
        setLocalListVisible(false);
        setAvailableLocal(localList.filter(l => l.id !== locale));
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale });
    }

  return (
    <div className={className}>
        <Menu as="div" className="relative inline-block text-left">
        <div>
            <Menu.Button className="inline-flex justify-center items-center w-full p-2 text-sm font-medium text-[#272B30]">
                <img className="mr-2 w-6 h-6 rounded-full" src={local.src} alt={local.label}/>
                <span className="text-sm text-white">{local.label} </span>
                {!localListVisible && (
                    <ChevronDownIcon className="h-4 w-4 text-white"/>
                )}
                {localListVisible && (
                     <ChevronUpIcon className="h-4 w-4 text-white"/>
                )}
            </Menu.Button>
        </div>
            <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-auto mt-1 p-2 origin-top-right bg-white rounded-b-md z-10 shadow-lg">
              <div className="px-1 py-1">
                    {availableLocals.map((loc, k) => (
                        <Menu.Item key={k} onClick={() => toggleLocal(loc.id)}>
                        {({ active }) => (
                          <div className="flex items-center justify-start py-1" key={k}>
                            <img className="w-6 h-6 rounded-full mr-2" src={loc.src} />
                            <span className="text-sm text-gray-500">{loc.label} </span>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                </div>
              </Menu.Items>
            </Transition>
    </Menu>
    </div>
  )
}
