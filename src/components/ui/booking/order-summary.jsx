import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const OrderSummary = ({ currentStep, selectedTickets, event }) => {
  const { watch, setValue } = useFormContext()
  const paymentMethod = watch('payment_method')
  const name = watch('name')
  const mail = watch('mail')
  const phone = watch('phone')

  useEffect(() => {
    setValue(`total_price`, calculateTotal())
  }, [selectedTickets])

  const calculateTotal = () => {
    return selectedTickets.reduce((total, ticket) => {
      return total + ticket.amount * ticket.price
    }, 0)
  }
  return (
    <div className="w-[25%] min-w-64 p-4 bg-[#FAFAFA] space-y-4 text-sm text-[#1b1b1b]">
      <span className='font-bold text-lg'>Chi tiết đơn hàng</span>
      <div className='flex items-center gap-2 p-2 border border-[#B2BCC2] rounded-lg'>
        <img
          src={event?.image}
          alt="Event"
          className='w-9 h-9 rounded'
        />
        <span className='text-xs font-bold'>{event?.title}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className='text-[#526876] font-normal'>Thời gian</span>
        <span className='text-[#1B1B1B] font-semibold'>{event?.start_time || ''}</span>
      </div>

      <hr className="border-t border-[#B2BCC2]" />

      <div className='space-y-2'>
        <span className='font-bold text-base'>Thông tin nhận vé</span>
        <div className="flex justify-between items-center">
          <span className='text-[#526876] font-normal'>Tên</span>
          <span className='text-[#1B1B1B] font-semibold'>{name || ''}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className='text-[#526876] font-normal'>Email</span>
          <span className='text-[#1B1B1B] font-semibold'>{mail || ''}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className='text-[#526876] font-normal'>Điện thoại</span>
          <span className='text-[#1B1B1B] font-semibold'>{phone || ''}</span>
        </div>
      </div>
      
      <hr className="border-t border-[#B2BCC2] border-dashed" />

      <div className='space-y-2'>
        <span className='font-bold text-base'>Hình thức thanh toán</span>
        <label className='block cursor-not-allowed text-[#526876] font-normal'>
          <input className='w-3 h-3 mr-2' type="radio" name="payment" value="momo" disabled checked={paymentMethod === "momo"}/>
          Momo
        </label>
        <label className='block cursor-not-allowed text-[#526876] font-normal'>
          <input className='w-3 h-3 mr-2' type="radio" name="payment" value="visa" disabled checked={paymentMethod === "visa"}/>
          ZaloPay
        </label>
      </div>
      
      <hr className="border-t border-[#B2BCC2] border-dashed" />

      <div className='space-y-2'>
        <span className='font-bold text-base'>Loại vé</span>
        {selectedTickets.map((ticket) => {
          if(ticket.amount > 0) {
            return (
            <div key={ticket.ticket_id} className="flex justify-between">
              <span className='text-[#526876] font-normal'>{ticket.name} x{ticket.amount}</span>
              <span className='text-[#1B1B1B] font-semibold'>{(ticket.amount * ticket.price).toLocaleString()} đ</span>
            </div>
            )
          }
        })}
      </div>

      <div className="flex justify-between">
        <span className='text-[#526876] font-normal'>Tổng tiền</span>
        <span className='text-[#0F2C40] font-bold text-xl'>{calculateTotal().toLocaleString()} đ</span>
      </div>

      <div
        className={`w-full p-3 rounded-lg font-bold text-center ${
          currentStep === 2 ?
            'bg-[#219ce4] text-[#FAFAFA] cursor-pointer hover:bg-sky-400'
            : 'bg-[#F3F3F3] text-[#B2BCC2] cursor-not-allowed'
        }`}
        disabled={currentStep !== 2}
      >
        Mua ngay
      </div>
    </div>
  )
}

export default OrderSummary
