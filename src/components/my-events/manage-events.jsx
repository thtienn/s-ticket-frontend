import Sidebar from '../ui/my-events/sidebar';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

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

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('title, organizer, shows, approveStatus');
            if (error) {
                console.error(error);
            } else {
                setEvents(data);
            }
            setLoading(false);
        };
        fetchEvents();
    }, []);

    return (
        <div className="flex-1 min-h-0 max-h-[calc(100vh-76px)] bg-[#fafafa] w-full flex flex-row gap-5 items-start overflow-auto">
            <Sidebar />
            <div className="flex flex-col w-full overflow-auto">
                <div className="flex flex-col items-start gap-3 w-full py-7 px-5 text-[#1b1b1b] overflow-hidden">
                    <p className="text-2xl font-extrabold">Tất cả nhân sự</p>
                    <div className="flex flex-row items-center gap-2">
                        {['Tất cả', 'Sắp tới & đang diễn ra', 'Đã diễn ra', 'Đã xóa'].map((role, index) => (
                            <RoleButton
                                key={index}
                                role={role}
                                isActive={role === activeState}
                                onClick={() => setActiveState(role)}
                            />
                        ))}
                    </div>

                    <div className="my-4 w-full">
                        {loading ? (
                            <p>Loading events...</p>
                        ) : events.length === 0 ? (
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
                                    {events.map((event, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="border px-4 py-2 max-w-[200px]">{event.title}</td>
                                            <td className="border px-4 py-2">{event.shows.length > 0 ? new Date(event.shows[0].start_date).toLocaleDateString() : null}</td>
                                            <td className="border px-4 py-2">{}</td>
                                            <td className="border px-4 py-2">{}</td>
                                            <td className="border px-4 py-2">{}₫</td>
                                            <td className="border px-4 py-2">
                                                <button className="text-blue-500 hover:underline">Sửa</button>{' '}
                                                |{' '}
                                                <button className="text-red-500 hover:underline">Xóa</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
