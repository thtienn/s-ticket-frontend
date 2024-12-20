import Sidebar from '../ui/my-events/sidebar';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { fetchUser } from '../../controllers/userController';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function RoleButton({ role, onClick, isActive }) {
    return (
        <button
            className={`flex px-4 py-2 items-center rounded-[32px] border border-black ${isActive ? 'bg-[#1b1b1b] text-[#fafafa]' : 'bg-[#fafafa] text-[#1b1b1b] hover:bg-[#d9d9d9]'}`}
            onClick={onClick}
        >
            {role}
        </button>
    );
}

export default function Manage() {
    const [activeState, setActiveState] = useState('Tất cả');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredEvents, setFilteredEvents] = useState([]);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         setLoading(true);
    //         try {
    //             const { userData, sessionStatus } = await fetchUser();

    //             if (sessionStatus && userData?.email) {
    //                 const { data, error } = await supabase
    //                     .from('events')
    //                     .select('id, name, organizer, miniEvents, status')
    //                     .eq('organizationId', userData.id)
    //                     .match({ status: 'APPROVED' });
    //                 if (error) {
    //                     console.error('Error fetching events:', error);
    //                 } else {
    //                     setEvents(data);
    //                     setFilteredEvents(data);
    //                 }
    //             } else {
    //                 console.error('User is not logged in or email is unavailable.');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchEvents();
    // }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const { userData, sessionStatus } = await fetchUser ();

                if (sessionStatus && userData?.id) {
                    // Construct the filter options as a JSON string
                    const filter = JSON.stringify({
                        where: {
                            organizationId: parseInt(userData.id,10),
                            // status: 'APPROVED',
                        },
                    });

                    console.log("User: ", userData.id)

                    // Fetch events from your backend
                    const response = await fetch(`http://localhost:3000/event/my-events/${userData.id}`);
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch events');
                    }

                    const data = await response.json();
                    setEvents(data);
                    setFilteredEvents(data);
                } else {
                    console.error('User  is not logged in or ID is unavailable.');
                }
            } catch (error) {
                console.error('Error fetching user data or events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleEventStatus = (status) => {
        setActiveState(status);
        let filtered;
        switch (status) {
            case 'Tất cả':
                filtered = events;
                break;
            case 'Sắp tới & đang diễn ra':
                // Filter events that have at least one show that is not yet ended
                filtered = events.filter(event => event.miniEvents.some(show => new Date(show.endTime) > new Date()));
                break;
            case 'Đã diễn ra':
                // Filter events that have all shows ended
                filtered = events.filter(event => event.miniEvents.every(show => new Date(show.endTime) < new Date()));
                break;
            case 'Đã xóa':
                filtered = events.filter(event => event.status === 'REJECTED');
                break;
            default:
                filtered = events;
                break;
        }
        setFilteredEvents(filtered);
    }

    const handleRemoveEvent = async (event_id, status) => {
        const { data, error } = await supabase.from('event').update({ status: status }).eq('id', event_id);
        if (error) {
            console.log('error', error);
            return;
        }
        console.log(data);
        const updatedEvents = events.map(event => {
            if (event.id === event_id) {
                return { ...event, status: status };
            }
            return event;
        });
        setEvents(updatedEvents);
        handleEventStatus(activeState);
    };

    return (
        <div className="flex-1 min-h-0 max-h-[calc(100vh-76px)] bg-[#fafafa] w-full flex flex-row gap-5 items-start overflow-auto">
            <Sidebar />
            <div className="flex flex-col w-full overflow-auto">
                <div className="flex flex-col items-start gap-3 w-full py-7 px-5 text-[#1b1b1b] overflow-hidden">
                    <p className="text-2xl font-extrabold">Tất cả sự kiện</p>
                    <div className="flex flex-row items-center gap-2">
                        {['Tất cả', 'Sắp tới & đang diễn ra', 'Đã diễn ra', 'Đã xóa'].map((role, index) => (
                            <RoleButton
                                key={index}
                                role={role}
                                isActive={role === activeState}
                                onClick={() => handleEventStatus(role)}
                            />
                        ))}
                    </div>

                    <div className="my-4 w-full">
                        {loading ? (
                            <p>Loading events...</p>
                        ) : filteredEvents.length === 0 ? (
                            <p>Không có sự kiện nào.</p>
                        ) : (
                            <table className="w-full border-collapse bg-white shadow-lg">
                                <thead className=''>
                                    <tr className="bg-gray-200 text-center">
                                        <th className="border px-4 py-2">Tên sự kiện</th>
                                        <th className="border px-4 py-2">Ngày bắt đầu</th>
                                        <th className="border px-4 py-2">Số lượng vé đã bán</th>
                                        <th className="border px-4 py-2">Số lượng vé còn lại</th>
                                        <th className="border px-4 py-2">Tổng doanh thu</th>
                                        <th className="border px-4 py-2">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEvents.map((event, index) => {
                                        const remainingTickets = event.miniEvents?.reduce((totalTickets, show) => {
                                            return totalTickets + show.ticket_types?.reduce((showTotal, ticket) => showTotal + ticket.quantity, 0) || 0;
                                        }, 0) || 0;
                                        
                                        const totalRevenue = event.miniEvents?.reduce((totalRevenue, show) => {
                                            return totalRevenue + show.ticketRanks.reduce(
                                                (showTotal, ticket) => showTotal + (ticket.amount - ticket.quantity) * ticket.price,
                                                0
                                            ) || 0;
                                        }, 0) || 0;

                                        return (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="border px-4 py-2 max-w-[200px]">{event.name}</td>
                                                <td className="border px-4 py-2">
                                                    {new Date(event.startTime).toLocaleString()}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {event.miniEvents[index]?.ticketRanks?.reduce((total, ticket) => total + (ticket.amount - ticket.quantity), 0) || 0}
                                                </td>
                                                <td className="border px-4 py-2">{remainingTickets}</td>
                                                <td className="border px-4 py-2">{totalRevenue.toLocaleString()}₫</td>
                                                <td className="border px-4 py-2">
                                                    <button className="text-blue-500 hover:underline">Sửa</button> |{' '}
                                                    <button className="text-red-500 hover:underline" onClick={() => handleRemoveEvent(event.id, "declined")}>Xóa</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
