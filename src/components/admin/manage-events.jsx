import AdminSidebar from "../ui/admin/sidebar"
import { useEffect, useState } from "react"

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

export default function ManageEvents() {
    const [activeStatus, setActiveStatus] = useState('Tất cả');
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3000/event/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
                setFilteredEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleEventStatus = (status) => {
        setActiveStatus(status);
        let filtered;
        switch (status) {
            case 'Tất cả':
                filtered = events;
                break;
            case 'Đang chờ':
                filtered = events.filter(event => event.status === 'PENDING');
                break;
            case 'Đã duyệt':
                filtered = events.filter(event => event.status === 'APPROVED');
                break;
            case 'Đã từ chối':
                filtered = events.filter(event => event.status === 'REJECTED');
                break;
            default:
                filtered = events;
                break;
        }
        setFilteredEvents(filtered);
    };

    function EventItem({ event }) {
        const StatusBadge = ({ status }) => {
            return (
                <div
                    className={`px-4 py-1 rounded-2xl text-xs font-semibold ${status === 'PENDING'
                        ? 'bg-[#f2e5cf] border-2 border-[#f2ae39] text-[#f2ae39]'
                        : status === 'APPROVED'
                            ? 'bg-[#cef6d0] border-2 border-[#56d45c] text-[#56d45c]'
                            : 'bg-[#fbcccc] border-2 border-[#f87474] text-[#f87474]'
                        }`}
                >
                    {status === 'PENDING'
                        ? 'Đang chờ'
                        : status === 'APPROVED'
                            ? 'Đã duyệt'
                            : 'Đã từ chối'}
                </div>
            )
        }

        const handleEventApproval = async (event_id, status) => {
            try {
                const response = await fetch(`http://localhost:3000/event/${event_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to update event status');
                }
                
                const updatedEvents = events.map(event => {
                    if (event.id === event_id) {
                        return { ...event, status };
                    }
                    return event;
                });
                setEvents(updatedEvents);
                handleEventStatus(activeStatus);
            } catch (error) {
                console.error('Error updating event status:', error);
            }
        };

        return (
            <div className={`w-full flex flex-row items-start justify-between py-5 px-6 rounded-xl border border-black hover:cursor-pointer hover:bg-[#d9d9d9]`}>
                <div className="flex flex-col items-start gap-1">
                    <p className="font-bold text-lg">{event.name}</p>
                    <p className="font-normal text-base">{event.organizerName || 'Unknown Organizer'}</p>
                </div>
                {event.status === 'PENDING' && (
                    <div className="flex flex-col items-end gap-4">
                        <StatusBadge status={event.status} />
                        <div className="flex flex-row items-center gap-2">
                            <button className="text-white bg-[#219ce4] px-4 py-2 rounded-lg" onClick={() => handleEventApproval(event.id, "APPROVED")}>Duyệt</button>
                            <button className="text-white bg-[#1b1b1b] px-4 py-2 rounded-lg" onClick={() => handleEventApproval(event.id, "REJECTED")}>Từ chối</button>
                        </div>
                    </div>
                )}
                {event.status === 'APPROVED' && (
                    <div className="flex flex-col items-end gap-4">
                        <StatusBadge status={event.status} />
                        <button className="text-white bg-[#1b1b1b] px-4 py-2 rounded-lg" onClick={() => handleEventApproval(event.id, "PENDING")}>Hủy</button>
                    </div>
                )}
                {event.status === 'REJECTED' && (
                    <div className="flex flex-col items-end gap-4">
                        <StatusBadge status={event.status} />
                        <button className="text-white bg-[#219ce4] px-4 py-2 rounded-lg" onClick={() => handleEventApproval(event.id, "APPROVED")}>Duyệt</button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="flex-1 min-h-0 max-h-[calc(100vh-76px)] bg-[#fafafa] w-full flex flex-row gap-5 items-start overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-col items-start gap-3 w-full py-7 px-5 text-[#1b1b1b] overflow-hidden">
                <p className="text-2xl font-extrabold">Tất cả sự kiện</p>
                <div className="flex flex-row items-center gap-2">
                    {['Tất cả', 'Đang chờ', 'Đã duyệt', 'Đã từ chối'].map((category, index) => (
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
