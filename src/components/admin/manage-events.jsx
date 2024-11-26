import AdminSidebar from "../ui/admin/sidebar"
import { useState } from "react"
import EVENTS from "../../mock_data/event.json"

const statuses = ['Tất cả', 'Đang chờ', 'Đã duyệt', 'Đã từ chối']

function CategoryButton({ category, onClick, isActive }) {
    return (
        <button
            className={`flex px-4 py-2 items-center rounded-[32px] border border-black ${isActive ? 'bg-[#1b1b1b] text-[#fafafa]' : 'bg-[#fafafa] text-[#1b1b1b] hover:bg-[#d9d9d9]'}`}
            onClick={onClick}
        >
            {category}
        </button>
    );
}

function EventItem({ event }) {
    const StatusBadge = ({ status }) => {
        return (
            <div
                className={`px-4 py-1 rounded-2xl text-xs font-semibold ${
                    status === 'pending'
                        ? 'bg-[#f2e5cf] border-2 border-[#f2ae39] text-[#f2ae39]'
                        : status === 'approved'
                        ? 'bg-[#cef6d0] border-2 border-[#56d45c] text-[#56d45c]'
                        : 'bg-[#fbcccc] border-2 border-[#f87474] text-[#f87474]'
                }`}
            >
                {status === 'pending'
                    ? 'Đang chờ'
                    : status === 'approved'
                    ? 'Đã duyệt'
                    : 'Đã từ chối'}
            </div>
        )
    }

    return (
        <div className={`w-full flex flex-row items-start justify-between py-5 px-6 rounded-xl border border-black hover:cursor-pointer hover:bg-[#d9d9d9]`}>
            <div className="flex flex-col items-start gap-1">
                <p className="font-bold text-lg">{event.title}</p>
                <p className="font-normal text-base">{event.organizer.name}</p>
            </div>
            {event.approveStatus === 'pending' && (
                <div className="flex flex-col items-end gap-4">
                    <StatusBadge status={event.approveStatus} />
                    <div className="flex flex-row items-center gap-2">
                        <button className="text-white bg-[#219ce4] px-4 py-2 rounded-lg">Duyệt</button>
                        <button className="text-white bg-[#1b1b1b] px-4 py-2 rounded-lg">Từ chối</button>
                    </div>
                </div>
            )}
            {event.approveStatus === 'approved' && (
                <div className="flex flex-col items-end gap-4">
                    <StatusBadge status={event.approveStatus} />
                    <button className="text-white bg-[#1b1b1b] px-4 py-2 rounded-lg">Hủy</button>
                </div>
            )}
            {event.approveStatus === 'declined' && (
                <div className="flex flex-col items-end gap-4">
                    <StatusBadge status={event.approveStatus} />
                    <button className="text-white bg-[#219ce4] px-4 py-2 rounded-lg">Duyệt lại</button>
                </div>
            )}
        </div>
    )
}

export default function ManageEvents() {
    const [activeStatus, setActiveStatus] = useState('Tất cả');
    const [filteredEvents, setFilteredEvents] = useState(EVENTS); // track filtered events

    const handleEventStatus = (status) => {
        setActiveStatus(status);
        
        // filter events by status
        let filtered;
        switch (status) {
            case 'Tất cả':
                filtered = EVENTS;
                break;
            case 'Đang chờ':
                filtered = EVENTS.filter(event => event.approveStatus === 'pending');
                break;
            case 'Đã duyệt':
                filtered = EVENTS.filter(event => event.approveStatus === 'approved');
                break;
            case 'Đã từ chối':
                filtered = EVENTS.filter(event => event.approveStatus === 'declined');
                break;
            default:
                filtered = EVENTS;
                break;
        }
        setFilteredEvents(filtered);
    };

    return (
        <div className="flex-1 min-h-0 max-h-[calc(100vh-76px)] bg-[#fafafa] w-full flex flex-row gap-5 items-start overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-col items-start gap-3 w-full py-7 px-5 text-[#1b1b1b] overflow-hidden">
                <p className="text-2xl font-extrabold">Tất cả sự kiện</p>
                <div className="flex flex-row items-center gap-2">
                    {statuses.map((category, index) => (
                        <CategoryButton
                            key={index}
                            category={category}
                            isActive={category === activeStatus}
                            onClick={() => handleEventStatus(category)}
                        />
                    ))}
                </div>
                <div className="my-2 flex flex-col items-start gap-2 w-full h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide">
                    {filteredEvents.map((event, index) => (
                        <EventItem key={index} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}
