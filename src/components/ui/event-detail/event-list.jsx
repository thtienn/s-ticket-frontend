import { useNavigate } from "react-router-dom";

export default function EventList({ event }) {
    console.log(event)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const navigate = useNavigate()

    const handleBooking = (show_id) => {
        window.scrollTo(0, 0);
        navigate(`/booking/${event.id}/${show_id}`)
    }

    return (
        <div className="flex flex-col gap-5 w-full font-semibold text-base">
            <span className="text-2xl font-bold text-[#1b1b1b]">THÔNG TIN VÉ</span>
            <div className="flex flex-col gap-5">
                {event?.miniEvents.map((show) => {
                    // Tính tổng lượng vé còn lại
                    const totalTicketsLeft = show.ticketRanks.reduce((total, ticket) => total + ticket.numberLimit - ticket.soldNumber, 0);

                    return (
                        <div
                            key={show.id}
                            className={`flex items-center justify-between px-6 py-5 rounded-2xl text-[#FAFAFA] ${
                                totalTicketsLeft > 0 ? 'bg-[#1b1b1b]' : 'bg-[#B2BCC2]'
                            }`}
                        >
                            <span>
                                {new Date(show.startTime).toLocaleDateString(undefined, options)} - {new Date(show.endTime).toLocaleDateString(undefined, options)}
                            </span>
                            {totalTicketsLeft > 0 ? (
                                <button
                                    onClick={() => handleBooking(show.id)}
                                    className="p-2 border-none text-sm bg-[#219CE4] rounded-lg"
                                >
                                    Mua vé ngay
                                </button>
                            ) : (
                                <span className="p-2 text-sm">Hết vé</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}