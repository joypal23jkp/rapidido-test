import React, {Fragment} from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export default function Filter({className, label, options = []}) {
  return (
    <div className={className}>
        <Menu as="div" className="relative inline-block text-left shadow rounded">
        <div>
            <Menu.Button className="inline-flex justify-center w-full p-2 text-sm font-medium text-[#272B30]">
            {label}
            <ChevronDownIcon
                className="w-5 h-5 ml-1 -mr-1 text-[#272B30]"
                aria-hidden="true"
            />
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
              <Menu.Items className="absolute right-0 w-auto mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="px-1 py-1 ">
                    {options.map((option, key) => (
                        <Menu.Item key={key}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-violet-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {option.name}
                          </button>
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
