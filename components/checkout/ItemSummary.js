import React from 'react'

export default function ItemSummary({summary}) {
  return (
    <div className="bg-white p-2 divide-y shadow rounded-md">

        <div className="text-[#333333] flex justify-between pb-2">
            <div className="font-bold text-xl uppercase">NET TOTAL</div>
            <div className="text-base font-bold">{summary.net_total}</div>
        </div>
        <div className="text-[#333333] flex justify-between py-2">
            <div className="font-medium text-sm uppercase">Total Items</div>
            <div className="text-base font-medium text-[#8A898B]">{summary.item_count}</div>
        </div>
        {summary.extras.map((extra, key) => (
            <div className="text-[#333333] flex justify-between py-2" key={key}>
                <div className="font-medium text-sm uppercase">{extra.title}</div>
                <div className="text-base font-medium text-[#8A898B]">{extra.value}</div>
            </div>
        ))}
        <div className="text-[#333333] flex justify-between pt-2">
            <div className="font-bold text-xl uppercase">Grand Total</div>
            <div className="text-base font-bold">{summary.grand_total}</div>
        </div>

    </div>
  )
}
