import React, {useState, useEffect} from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import CrosshairIcon from '../public/icons/svg/Crosshairs.svg';
import ScannerIcon from '../public/icons/svg/Scanner.svg';

export default function Search({
                                  className,
                                  placeholder = "Buscar ciudad, " +
                                  "restaurante...",
                                  defaultValue="",
                                  onKeyDown = () => {},
                                  onKeyUp = () => {},
                                  onChange = () => {},
                                  onFocusChanged = (value) => {}
                               }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  function updateValue(e) {
    setValue(e.target.value);
    onChange(e);
  }
  function handleFocus() {
    onFocusChanged(true);
  }
  function handleBlur() {
    onFocusChanged(false);
  }

  return (
    <div className={className}>
        <SearchIcon className="h-6 w-6 mr-1 text-[#969595]"/>
        <input
            className="w-full h-7 outline-none text-xs"
            value={value}
            type="text"
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={updateValue}
        />
        {/* <div><CrosshairIcon className="h-5 w-5" /></div>
        <div className="h-5 w-[1px] bg-[#D2D2D2] mx-[10px]"></div>
        <div><ScannerIcon className="h-5 w-5"/></div> */}
    </div>
  )
}
