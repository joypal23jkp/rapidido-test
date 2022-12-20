import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

const Select = ({ options = [''], selectedItem = null, label = '', onSelectedItemChanged }) => {
    return (
        <div className="w-full">
            <Listbox value={selectedItem} onChange={onSelectedItemChanged}>
                <div className="relative mt-4">
                    <label className='block font-medium text-base text-[#272B30] mb-2' htmlFor={label}>
                        {label}
                    </label>
                    <Listbox.Button className="input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border- focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block font-medium text-base text-[#272B30] mb-2">{selectedItem}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                          />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-[999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((option, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                              className={`block truncate ${
                                                  selected ? 'font-medium' : 'font-normal'
                                              }`}
                                            >
                                                {option}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default Select;
