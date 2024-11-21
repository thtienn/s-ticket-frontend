import React from "react";

const tickets = [
  { id: 1, name: 'VÉ RỐP RẺNG', price: 490000, description: 'Hạng vé ĐỨNG.', amount: 0 },
  { id: 2, name: 'VÉ THÔNG THẢ', price: 1120000, description: 'Hạng vé ngồi.', amount: 10 },
  { id: 3, name: 'VÉ SIÊU VIP', price: 5000000, description: 'Hạng vé VIP.', amount: 2 },
  // { id: 4, name: 'VÉ SIÊU VIP', price: 5000000, description: 'Hạng vé VIP.' },
  // { id: 5, name: 'VÉ SIÊU VIP', price: 5000000, description: 'Hạng vé VIP.' },
];

const FirstStep = ({selectedTickets, setSelectedTickets}) => {
  const handleTicketChange = (ticketId, amount) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: Math.max(0, (prev[ticketId] || 0) + amount),
    }));
  };
  return (
    <div className='flex flex-col gap-8'>
      <div>
        <div className='text-[#1B1B1B] text-2xl font-extrabold'>Chọn vé</div>
        <div className='text-[#AEAEAE] text-base font-normal'>Hãy chọn loại vé và số lượng vé bạn muốn mua!</div>
      </div>
      <div className="flex flex-col gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="flex justify-between gap-4 items-center p-6 rounded-2xl bg-[#1b1b1b]">
            <div>
              <div className='text-[#219ce4] text-2xl font-bold'>{ticket.name} | {ticket.price.toLocaleString()} đ</div>
              <div className='text-[#FAFAFA] italic text-sm font-normal'>{ticket.description}</div>
            </div>
            <div className="flex justify-center items-center text-[#FAFAFA] text-xl font-bold">
              <button className='bg-[#1b1b1b] border border-[#FAFAFA] w-12 h-12 rounded-full flex justify-center items-center' onClick={() => handleTicketChange(ticket.id, -1)}>-</button>
              <span className='p-5'>{selectedTickets[ticket.id] || 0}</span>
              <button className='bg-[#219ce4] w-12 h-12 rounded-full flex justify-center items-center' onClick={() => handleTicketChange(ticket.id, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FirstStep