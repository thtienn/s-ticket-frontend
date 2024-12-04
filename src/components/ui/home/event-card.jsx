import Button from "../shared/button";

export default function EventCard({ event, onClick }) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className="flex relative rounded-3xl min-w-[405px] max-w-[405px] min-h-[480px] border border-black bg-[#fafafa]">
            <div className="absolute top-0 inset-x-0 rounded-t-3xl">
                <img src={event.image} alt={event.name} className="w-full h-[240px] object-cover rounded-t-3xl" />
            </div>
            <div className="absolute w-full bottom-0 p-5 flex flex-col gap-10">
                <div className="flex flex-col items-start gap-2 text-[#1b1b1b]">
                    <p className="text-lg font-bold text-left">{event.name}</p>
                    <div className="flex flex-col items-start gap-1 text-base font-normal">
                        <div className="flex flex-row items-center gap-3">
                            <img src="/assets/icons/ticket.svg" alt="ticket" />
                            <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.price)}</p>
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <img src="/assets/icons/calendar.svg" alt="calendar" />
                            <p>{new Date(event.date).toLocaleDateString(undefined, options)}</p>
                        </div>
                    </div>
                </div>
                <Button bgColor={'#1b1b1b'} textColor={'#fafafa'} title={'Mua vé'} onClick={onClick} />
            </div>
        </div>
    )
}
