import React, { useState } from "react"

const ThirdStep = ({payment, setPayment}) => {
  const [discount, setDiscount] = useState('')
  const handleDiscountChange = (e) => {
    setDiscount(e.target.value)
  }
  const handleMethodChange = (e) => {
    const selectedMethod = parseInt(e.target.value)
    setPayment(prev => ({ ...prev, method: selectedMethod, option: 0 }))
  }

  const handleOptionChange = (e) => {
    const selectedOption = parseInt(e.target.value)
    setPayment(prev => ({ ...prev, option: selectedOption }))
  }
  return (
    <div className='flex flex-col gap-8'>
      <div>
        <div className="text-[#1B1B1B] text-2xl font-extrabold">Thanh toán</div>
        <div className="text-[#AEAEAE] text-base font-normal">
          Lưu ý kiểm tra thông tin nhận vé. Nếu có thay đổi, vui lòng cập nhật lại thông tin!
        </div>
      </div>
      <div className='flex flex-col gap-6 text-[#1B1B1B] text-base'>
        <div>
          <div className='font-semibold mb-4'>Mã giảm giá</div>
          <div className="flex gap-6">
            <div className='flex-[3]'>
            <input
              className='w-full p-3 border border-[#1B1B1B] rounded-lg'
              value={discount}
              onChange={handleDiscountChange}
            />
            </div>
            <div className='flex-[1]'>
              <button
                className={`w-full p-3 text-[#FAFAFA] rounded-lg ${
                  discount.trim() ? 'bg-[#219ce4]' : 'bg-[#b2bcc2]'
                }`}>
                Áp dụng
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className='font-semibold mb-4'>Phương thức thanh toán:</div>
          <select
            value={payment.method}
            onChange={handleMethodChange}
            className="w-full p-3 border border-[#1B1B1B] rounded-lg"
          >
            <option value={0} disabled>Chọn phương thức thanh toán</option>
            <option value={1}>Thanh toán trực tiếp</option>
            <option value={2}>Thanh toán trực tuyến</option>
          </select>
        </div>
        {payment.method === 2 && (
          <div className="flex flex-col items-start gap-4 pl-5">
            <label className="cursor-pointer flex gap-4">
              <input
                className='w-3 h-3 mt-2'
                type="radio"
                id="momo"
                name="paymentOption"
                value="0"
                checked={payment.option === 0}
                onChange={handleOptionChange}
              />
              <div className="flex flex-col items-start gap-1">
                <span>Ví MoMo</span>
                <img
                  src="/assets/icons/momo.svg"
                  alt="MoMo"
                  className="w-5 h-5"
                />
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                className='w-3 h-3 mr-2'
                type="radio"
                id="visa"
                name="paymentOption"
                value="1"
                checked={payment.option === 1}
                onChange={handleOptionChange}
              />
              Thẻ thanh toán quốc tế
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

export default ThirdStep