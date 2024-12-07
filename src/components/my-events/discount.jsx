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

export default function Discount() {
    const [fileredVouchers, setFilteredVouchers] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Tất cả');

    return (
        <div className="flex-1 min-h-0 max-h-[calc(100vh-76px)] bg-[#fafafa] w-full flex flex-row gap-5 items-start overflow-auto">
            <Sidebar />
            <div className='flex flex-col w-full overflow-auto'>
                <div className="flex flex-col items-start gap-2 w-full pt-7 px-5 text-[#1b1b1b] overflow-hidden">
                    <p className="text-2xl font-extrabold">Thêm mã giảm giá</p>
                    <div className="flex flex-col items-center gap-4 w-full">
                        <div className='flex flex-row items-start gap-4 w-full'>
                            <div className='flex flex-col items-start text-[#1b1b1b] w-full gap-2'>
                                <span className='font-bold text-lg'>Mã giảm giá:</span>
                                <input type="text" placeholder="Mã giảm giá" className="w-full px-4 pr-8 py-2 border border-black rounded-lg" />
                            </div>
                            <div className='flex flex-col items-start text-[#1b1b1b] w-full gap-2'>
                                <span className='font-bold text-lg'>Giảm giá:</span>
                                <input type="number" placeholder="Giảm giá" className="w-full px-4 pr-8 py-2 border border-black rounded-lg" />
                            </div>
                        </div>
                        <div className='flex flex-row items-start gap-4 w-full'>
                            <div className='flex flex-col items-start text-[#1b1b1b] w-full gap-2'>
                                <span className='font-bold text-lg'>Sự kiện:</span>
                                <select className="w-full px-4 py-2 border border-black rounded-lg">
                                    <option value="supervisor">Chọn sự kiện</option>
                                    <option value="staff">Sự kiện 1</option>
                                    <option value="staff">Sự kiện 2</option>
                                    <option value="staff">Sự kiện 3</option>
                                </select>
                            </div>
                            <div className='flex flex-col items-start text-[#1b1b1b] w-full gap-2'>
                                <span className='font-bold text-lg'>Số lượng:</span>
                                <input type="number" placeholder="Giảm giá" className="w-full px-4 pr-8 py-2 border border-black rounded-lg" />
                            </div>
                        </div>
                        <div className='flex flex-row items-start gap-4 w-full'>
                            <div className='flex flex-col items-start text-[#1b1b1b] w-full gap-2'>
                                <span className='font-bold text-lg'>Ngày bắt đầu:</span>
                                <input type="date" placeholder="Ngày bắt đầu" className="w-full px-4 pr-8 py-2 border border-black rounded-lg" />
                            </div>
                            <div className='flex flex-col items-start text-[#1b1b1b] w-full gap-2'>
                                <span className='font-bold text-lg'>Ngày hết hạn:</span>
                                <input type="date" placeholder="Ngày hết hạn" className="w-full px-4 pr-8 py-2 border border-black rounded-lg" />
                            </div>
                        </div>
                        <button className="text-white bg-[#1b1b1b] px-4 py-2 rounded-lg mt-3">Tạo mã</button>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-3 w-full py-7 px-5 text-[#1b1b1b] overflow-hidden">
                    <p className="text-2xl font-extrabold">Tất cả mã giảm giá</p>
                    <div className="flex flex-row items-center gap-2">
                        {['Tất cả', 'Có hiệu lực', 'Đã hết hạn'].map((role, index) => (
                            <RoleButton
                                key={index}
                                role={role}
                                isActive={role === activeFilter}
                                // onClick={() => handleUserStatus(role)}
                            />
                        ))}
                    </div>
                    <div className="my-2 flex flex-col items-start gap-2 w-full h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide">
                        {fileredVouchers?.map((user, index) => (
                            <UserItem key={index} user={user} />
                        ))}
                        {fileredVouchers.length === 0 && (
                            <p>Không có mã giảm giá nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}