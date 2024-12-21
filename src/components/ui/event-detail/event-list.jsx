import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default function EventList({ event }) {
    const dateOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
      
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false // Hiển thị định dạng 24 giờ
    };
    const navigate = useNavigate()

    const handleBooking = async (show_id) => {
        window.scrollTo(0, 0);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/login', { replace: true });
            return;
        }
        navigate(`/booking/${event.id}/${show_id}`)
    }

    return (
        <div className="max-w-screen" id="event-list">
            <div className="flex flex-col items-start gap-7 px-[120px] pt-16 relative mx-auto w-full max-w-[1440px]">
                <div className="flex flex-col gap-5 w-full font-semibold text-base">
                    <span className="text-black text-[32px] leading-10 font-bold text-left">THÔNG TIN VÉ</span>
                    <div className="flex flex-col gap-5">
                        {event?.miniEvents.map((show) => {
                            // Tính tổng lượng vé còn lại
                            const totalTicketsLeft = show.ticketRanks.reduce((total, ticket) => total + ticket.numberLimit - ticket.soldNumber, 0);
                    return (
                        <div
                            key={show.id}
                            className={`flex items-center justify-between px-6 py-5 rounded-2xl text-[#FAFAFA] ${
                                totalTicketsLeft > 0 && new Date(show.startTime) >= new Date() ? 'bg-[#1b1b1b]' : 'bg-[#B2BCC2]'
                            }`}
                        >
                            <span>
                            {new Date(show.startTime).toLocaleTimeString('vi-VN', timeOptions)}, {new Date(show.startTime).toLocaleDateString('vi-VN', dateOptions)} - {new Date(show.endTime).toLocaleTimeString('vi-VN', timeOptions)}, {new Date(show.endTime).toLocaleDateString('vi-VN', dateOptions)}
                            </span>
                            {new Date(show.startTime) < new Date() ? (
                                <span className="p-2 text-sm">Đã diễn ra</span>
                            ) : totalTicketsLeft > 0 ? (
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
        </div>
        </div>
    );
}