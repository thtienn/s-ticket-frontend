import Footer from './ui/shared/footer';
import { useEffect, useState } from 'react';
import Order from './ui/tickets-list/order';
import { fetchUserTickets } from '../controllers/orderController';
import { fetchUser } from '../controllers/userController';

function CategoryButton({ category, onClick, isActive }) {
    return (
        <button
            className={`flex px-4 py-2 items-center rounded-[32px] border border-black ${isActive ? 'bg-[#1b1b1b] text-[#fafafa]' : 'bg-[#fafafa] text-[#1b1b1b]'}`}
            onClick={onClick}
        >
            {category.text}
        </button>
    );
}

const categories = [
    { text: 'Tất cả', value: 'ALL' },
    { text: 'Chưa dùng', value: 'UNUSED' },
    { text: 'Đã dùng', value: 'USED' },
    { text: 'Đã hủy', value: 'CANCELLED' }
];

export default function TicketsList() {
    const [orders, setOrders] = useState([]);
    const [session, setSession] = useState({});
    const [activeCategory, setActiveCategory] = useState(categories[1]);

    const fetchOrdersData = async (userId, status) => {
        try {
            const fetchedTickets = await fetchUserTickets(userId, status !== 'ALL' ? status : undefined);
            setOrders(fetchedTickets || []);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const { userData } = await fetchUser();
            if (userData) {
                setSession(userData);
                fetchOrdersData(userData.id, activeCategory.value);
            }
        };
        fetchUserData();
    }, [activeCategory]);

    if (!session) {
        return <div className="text-black">User not found</div>;
    }

    if (orders.length === 0) {
        return <div className="text-black">Chưa có hóa đơn nào</div>;
    }

    return (
        <div className="relative min-h-[100dvh] bg-[#fafafa] w-full text-[#1b1b1b] font-sans text-start">
            <div className="h-full w-full">
                <main className="flex flex-col w-full overflow-x-hidden px-24 py-8 gap-8">
                    <p className="text-3xl text-[#1b1b1b] font-extrabold text-center">Danh sách vé</p>
                    <div className="flex justify-center gap-4 mb-8">
                        {categories.map((category) => (
                            <CategoryButton
                                key={category.value}
                                category={category}
                                onClick={() => setActiveCategory(category)}
                                isActive={activeCategory.value === category.value}
                            />
                        ))}
                    </div>
                    {orders.map((order, index) => (
                        <Order key={index} order={order} />
                    ))}
                </main>
                <Footer />
            </div>
        </div>
    );
}
