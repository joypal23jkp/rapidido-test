import React, {useState} from 'react';

const flags = [
    'http://www.rapedido.es/assets/img/icon/spain.png',
    'http://www.rapedido.es/assets/img/icon/sweden.png',
    'http://www.rapedido.es/assets/img/icon/uk.png',
];

const BottomBarItems = [
    {
      icon: 'http://www.rapedido.es/assets/img/icon/back.svg',
      label: "Back"
    },
    {
      icon: 'http://www.rapedido.es/assets/img/icon/scan.svg',
      label: "Scan"
    },
    {
      icon: 'http://www.rapedido.es/assets/img/icon/cart.svg',
      label: "Cart"
    },
    {
      icon: 'http://www.rapedido.es/assets/img/icon/arrow.svg',
      label: "Next"
    },
    {
      icon: 'http://www.rapedido.es/assets/img/icon/us.png',
      label: "US"
    },
    {
      icon: 'http://www.rapedido.es/assets/img/icon/notification.svg',
      label: "Messages"
    },
    {
      icon: 'http://www.rapedido.es/assets/img/icon/profile.svg',
      label: "Profile"
    },
  ];

export default function BottomNavigationBar({items = BottomBarItems}) {
    const [langPopover, setLangPopover] = useState(false);

  return (
    <div className="w-full fixed bottom-0">
        <div className="flex justify-evenly items-end bg-green-500 rounded-t-2xl py-2">
        {items.map((item, key) => (
            <div key={key} className="relative text-center">
                <div className="flex flex-col items-center" onClick={() => setLangPopover(current => !current)}>
                    <a className={3 == key ? "flex justify-center bg-yellow-400 rounded-[50%] absolute top-[-50px] left-[-10px] drop-shadow-lg": ""}>
                        <img className={3 == key ? "my-[15px] mx-[20px] h-4 text-white": "h-6 text-white"} src={item.icon} alt={item.label} />
                    </a>
                    <h4 className="text-[10px] font-normal text-white mt-2">{item.label}</h4>
                </div>
                {langPopover && key == 4 && (
                    <div className="block w-10 absolute bottom-full z-[-1] bg-white p-2 left-[-9px] rounded-t-md">
                        {flags.map((flag, k) => (
                            <img className="h-[26px] mb-2" src={flag} key={k} />
                        ))}
                        
                    </div>
                )}
            </div>
        ))}
        </div>
    </div>
  )
};
