import React from 'react';
import {HeartIcon} from '@heroicons/react/outline';
import {ClockIcon, StarIcon, LocationMarkerIcon} from '@heroicons/react/solid';
// import HeartIcon from '../../public/icons/svg/Heart.svg'

export const products =  [{
    "name": "Tomas Fashion House ltd.",
    "detail": "Lorem ipsum dolor sit amet",
    "price": "99",
    "type": "Fashion House",
    "image": "/images/product/tomas-fashion-house.png"
  },{
    "name": "Haven of sports",
    "detail": "Lorem ipsum dolor sit amet",
    "price": "99",
    "type": "Sports Shop",
    "image": "/images/product/haven-of-sports.jpg"
  },{
    "name": "Denish Clothing & Fashion",
    "detail": "Lorem ipsum dolor sit amet",
    "price": "99",
    "type": "Fashion House",
    "image": "/images/product/cam-morin.jpg"
  },{
    "name": "Kacchi Express",
    "detail": "Lorem ipsum dolor sit amet",
    "type": "Fashion House",
    "price": "99",
    "image": "/images/product/tomas-fashion-house.png"
  },{
    "name": "Product 4",
    "detail": "Lorem ipsum dolor sit amet",
    "price": "99",
    "type": "Fashion House",
    "image": "/images/product/cam-morin.jpg"
  },{
    "name": "Product 5",
    "detail": "Lorem ipsum dolor sit amet",
    "type": "Fashion House",
    "price": "99",
    "image": "/images/product/haven-of-sports.jpg"
  },{
    "name": "Product 6",
    "detail": "Lorem ipsum dolor sit amet",
    "price": "99",
    "info": "This is the latest and greatest product from Derp corp.",
    "type": "Fashion House",
    "image": "/images/product/tomas-fashion-house.png"
  }];

export default function Card({item}) {
  return (
    <a className="flex flex-col justify-between bg-white w-full rounded-lg overflow-clip shadow-df mx-auto" href={`https://swype-pos-react-order-app.vercel.app/restaurant/${item.companyId}`}>

      <div className="w-full h-full flex justify-center items-center relative max-h-[322px]">
          {
              (!item.companyLogoUrl)?
                  <img className="w-full h-full object-contain" src={'images/empty_image.jpg'} alt={item.companyName} />
                  : <img className="w-full h-full object-contain" src={item.companyLogoUrl} alt={item.companyName} />
          }
          <div className="absolute top-2 right-2 bg-white rounded-full p-1">
              <HeartIcon className="h-7 w-7 text-[#33383F] stroke-[1.5px]" onClick={() => alert(item.name)}/>
          </div>
      </div>
      {/** card body */}
      <div className="pt-[10px] px-4 pb-[14px] flex-1">
          {/** card heading */}
          <div className="flex flex-col">
              <div className="text-gray-400 mb-1">
                  <h4 className="text-[#27173E] font-bold text-base">{item.companyName}</h4>
              </div>
              <div className="flex justify-between">
                  <p className="text-sm">{item.companyCategory || "Unknown"}</p>
                  <div className="w-auto flex">
                      {new Array(5).fill(0).map((_, key) => (
                          <StarIcon className={`h-[14px] w-[15px] ${key !== 4 ? "text-primary" : "text-[#DFDFDF]"}`} key={key}/>
                      ))}
                  </div>
              </div>
          </div>

          {/** card address */}
          <div className="flex justify-between">
              <div className="flex flex-row items-end text-[#6F707B] flex-1">
                  <LocationMarkerIcon className="h-5 w-5 mr-1 text-primary" />
                  <p className="text-xs">{item.companyLocation}</p>
              </div>
              <div className="flex flex-row justify-end items-center">
                  <ClockIcon className="h-5 w-5 text-orange-500 mr-1" />
                  <span className="text-xs text-[#6F707B]">30-60 m</span>
              </div>
          </div>

      </div>

    </a>
  )
}
