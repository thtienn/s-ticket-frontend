const Order = ({ order }) => {
    const formattedDate = () => {
        if(order.start_date) {
          const options = { day: '2-digit', month: 'long', year: 'numeric' }
          const formatter = new Intl.DateTimeFormat('vi-VN', options)
          return formatter.format(new Date(order.start_date));
        }
        return ''
    }
    const enableCancel = () => {
        return order.cancel_request !== 0
    }
    return (
        <div className="flex flex-1 w-full border border-[#1b1b1b] rounded-xl justify-between p-4 text-sm font-normal items-start">
            <div className="flex flex-col gap-2">
                <div className="text-lg font-bold">{order.event_title}</div>
                <div className="flex gap-2">
                    <span>Thời gian: </span>
                    <span className="font-semibold">{`${order.start_time || ''}, ${formattedDate()}`}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span>Chi tiết vé:</span>
                    {order.tickets.filter(ticket => ticket.buy_amount > 0).map((ticket, index) => (
                        <div key={index}>
                            <div className="italic font-semibold">{`${ticket.ticket_name} x${ticket.buy_amount}`}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <button
                    className={`text-center rounded-md font-semibold  py-1 px-3 ${
                        enableCancel() ? 'text-[#FAFAFA] bg-[#ff4d4f] cursor-pointer hover:bg-red-600' : 'bg-[#F3F3F3] text-[#B2BCC2] cursor-not-allowed'
                    }`}
                >
                    Hủy vé
                </button>
                <div></div>
            </div>
        </div>
    );
}

export default Order