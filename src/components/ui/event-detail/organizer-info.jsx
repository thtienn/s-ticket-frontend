export default function OrganizerInfo({ event }) {
    return (
        <div className="flex flex-col gap-5 w-full text-[#1b1b1b]">
            <span className="text-2xl font-bold">BAN TỔ CHỨC</span>
            <div className="flex items-start gap-6 px-10 py-7 border border-black rounded-3xl">
                {/* Logo */}
                <div className="w-20 h-20 flex-shrink-0">
                    <img
                        src={event?.organizerImage}
                        alt={'logo'}
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                {/* Organizer Details */}
                <div>
                    <div className="text-xl font-semibold">{event?.organizerName}</div>
                    <div className="text-sm mt-1">{event?.organizerDescription}</div>
                </div>
            </div>
        </div>
    );
}
