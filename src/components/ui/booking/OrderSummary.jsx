import React from 'react'

const OrderSummary = ({ currentStep, selectedTickets, tickets, user, payment, event }) => {
  const calculateTotal = () => {
    return tickets.reduce((total, ticket) => {
      const quantity = selectedTickets[ticket.id] || 0
      return total + quantity * ticket.price
    }, 0)
  }
  return (
    <div className="w-[25%] min-w-64 p-4 bg-[#FAFAFA] space-y-4 text-sm text-[#1b1b1b]">
      <span className='font-bold text-lg'>Chi tiết đơn hàng</span>
      <div className='flex items-center gap-2 p-2 border border-[#B2BCC2] rounded-lg'>
        <img
          src={event.image}
          alt="Event"
          className='w-9 h-9 rounded'
        />
        <span className='text-xs font-bold'>{event.title}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className='text-[#526876] font-normal'>Thời gian</span>
        <span className='text-[#1B1B1B] font-semibold'>{event.date || ''}</span>
      </div>

      <hr className="border-t border-[#B2BCC2]" />

      <div className='space-y-2'>
        <span className='font-bold text-base'>Thông tin nhận vé</span>
        <div className="flex justify-between items-center">
          <span className='text-[#526876] font-normal'>Tên</span>
          <span className='text-[#1B1B1B] font-semibold'>{user.name || ''}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className='text-[#526876] font-normal'>Email</span>
          <span className='text-[#1B1B1B] font-semibold'>{user.email || ''}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className='text-[#526876] font-normal'>Điện thoại</span>
          <span className='text-[#1B1B1B] font-semibold'>{user.phone || ''}</span>
        </div>
      </div>
      
      <hr className="border-t border-[#B2BCC2] border-dashed" />

      <div className='space-y-2'>
        <span className='font-bold text-base'>Phương thức thanh toán</span>
        <label className='block cursor-not-allowed text-[#526876] font-normal'>
          <input className='w-3 h-3 mr-2' type="radio" name="payment" value="direct" disabled checked={payment.method === 1}/>
          Trực tiếp
        </label>
        <label className='block cursor-not-allowed text-[#526876] font-normal'>
          <input className='w-3 h-3 mr-2' type="radio" name="payment" value="online" disabled checked={payment.method === 2}/>
          Trực tuyến
        </label>
      </div>
      
      <hr className="border-t border-[#B2BCC2] border-dashed" />

      <div className='space-y-2'>
        <span className='font-bold text-base'>Loại vé</span>
        {tickets.map((ticket) => (
          selectedTickets[ticket.id] > 0 && (
            <div key={ticket.id} className="flex justify-between">
              <span className='text-[#526876] font-normal'>{ticket.name} x{selectedTickets[ticket.id]}</span>
              <span className='text-[#1B1B1B] font-semibold'>{(selectedTickets[ticket.id] * ticket.price).toLocaleString()} đ</span>
            </div>
          )
        ))}
      </div>

      <div className="flex justify-between">
        <span className='text-[#526876] font-normal'>Tổng tiền</span>
        <span className='text-[#0F2C40] font-bold text-xl'>{calculateTotal().toLocaleString()} đ</span>
      </div>

      <button
        className={`w-full p-3 rounded-lg font-bold ${
          currentStep === 2 ? 'bg-[#219ce4] text-[#FAFAFA] cursor-pointer' : 'bg-[#F3F3F3] text-[#B2BCC2] cursor-not-allowed'
        }`}
        disabled={currentStep !== 2}
      >
        Mua ngay
      </button>
    </div>
  )
}

export default OrderSummary
