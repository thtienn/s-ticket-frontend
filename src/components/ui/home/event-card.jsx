import Button from "../shared/button";

export default function EventCard({ event, onClick }) {
    return (
        <div className="rounded-3xl border border-black bg-[#fafafa]">
            <div className="top-0 inset-x-0 rounded-t-3xl">
                <img src={event.image} alt={event.title} className="w-full h-[240px] object-cover rounded-t-3xl" />
            </div>
            <div className="p-5 flex flex-col justify-between gap-10">
                <div className="flex flex-col items-start gap-2 text-[#1b1b1b]">
                    <p className="text-lg font-bold text-left">{event.title}</p>
                    <div className="flex flex-col items-start gap-1 text-base font-normal">
                        <div className="flex flex-row items-center gap-3">
                            <img src="/assets/icons/ticket.svg" alt="ticket" />
                            <p>{event.price} VND</p>
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <img src="/assets/icons/calendar.svg" alt="calendar" />
                            <p>{event.date}</p>
                        </div>
                    </div>
                </div>
                <Button bgColor={'#b2bcc2'} textColor={'#fafafa'} title={'Mua vé'} />
            </div>
        </div>
    )
}