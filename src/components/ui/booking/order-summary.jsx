import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const OrderSummary = ({ currentStep, selectedTickets, event, onClick }) => {
  const { watch, setValue, handleSubmit } = useFormContext()
  const paymentMethod = watch('payment_method')
  const name = watch('name')
  const email = watch('email')
  const phoneNumber = watch('phoneNumber')
  const start_time = watch('start_time')
  const end_time = watch('end_time')
  const formattedDateTime = (dateString) => {
    if (dateString) {
      const date = new Date(dateString)
      const dateOptions = { day: '2-digit', month: 'long', year: 'numeric' }
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
      const dateFormatter = new Intl.DateTimeFormat('vi-VN', dateOptions)
      const timeFormatter = new Intl.DateTimeFormat('vi-VN', timeOptions)
      return ` ${timeFormatter.format(date)},${dateFormatter.format(date)}`
    }
    return ''
  }

  useEffect(() => {
    setValue(`total_price`, calculateTotal())
  }, [selectedTickets])

  const calculateTotal = () => {
    return selectedTickets.reduce((total, ticket) => {
      return total + ticket.amount * ticket.price
    }, 0)
  }
  return (
    <div className="w-[25%] min-w-64 p-4 bg-[#FAFAFA] space-y-3 text-sm text-[#1b1b1b]">
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
        <span className='text-[#526876] font-normal'>Bắt đầu</span>
        <span className='text-[#1B1B1B] font-semibold'>{formattedDateTime(start_time)}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className='text-[#526876] font-normal'>Kết thúc</span>
        <span className='text-[#1B1B1B] font-semibold'>{formattedDateTime(end_time)}</span>
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
          <span className='text-[#1B1B1B] font-semibold'>{email || ''}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className='text-[#526876] font-normal'>Điện thoại</span>
          <span className='text-[#1B1B1B] font-semibold'>{phoneNumber || ''}</span>
        </div>
      </div>

      <hr className="border-t border-[#B2BCC2] border-dashed" />

      <div className='space-y-2'>
        <span className='font-bold text-base'>Hình thức thanh toán</span>
        <label className='block cursor-not-allowed text-[#526876] font-normal'>
          <input className='w-3 h-3 mr-2' type="radio" name="payment" value="momo" disabled checked={paymentMethod === "momo"} />
          Momo
        </label>
        <label className='block cursor-not-allowed text-[#526876] font-normal'>
          <input className='w-3 h-3 mr-2' type="radio" name="payment" value="zalo" disabled checked={paymentMethod === "zalo"} />
          ZaloPay
        </label>
        <label className='block cursor-not-allowed text-[#526876] font-normal'>
          <input className='w-3 h-3 mr-2' type="radio" name="payment" value="paypal" disabled checked={paymentMethod === "paypal"} />
          PayPal
        </label>
      </div>

      <hr className="border-t border-[#B2BCC2] border-dashed" />

      <div className='space-y-2'>
        <span className='font-bold text-base'>Loại vé</span>
        {selectedTickets.map((ticket) => {
          if (ticket.amount > 0) {
            return (
              <div key={ticket.ticket_id} className="flex justify-between">
                <span className='text-[#526876] font-normal'>{ticket.name} x{ticket.amount}</span>
                <span className='text-[#1B1B1B] font-semibold'>{(ticket.amount * ticket.price).toLocaleString()} đ</span>
              </div>
            )
          }
        })}
      </div>

      <div className="flex items-baseline justify-between">
        <span className='text-[#526876] font-normal'>Tổng tiền</span>
        <span className='text-[#0F2C40] font-bold text-xl'>{calculateTotal().toLocaleString()} đ</span>
      </div>
    </div>
  )
}

export default OrderSummary
