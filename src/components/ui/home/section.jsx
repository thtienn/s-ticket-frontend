import { useState, useEffect } from 'react';
import EventCard from './event-card';
import { useNavigate } from 'react-router-dom';
import { fetchAllEvents } from '../../../controllers/eventController';

const EVENTS = [
    {
        id: 1,
        title: 'YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024',
        category: 'Âm nhạc',
        image: '/assets/images/yhb.png',
        date: '5 tháng 10, 2024',
        price: 599000,
    },
    {
        id: 2,
        title: 'YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024',
        category: 'Âm nhạc',
        image: '/assets/images/yhb.png',
        date: '5 tháng 10, 2024',
        price: 599000,
    },
    {
        id: 3,
        title: 'YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024',
        category: 'Âm nhạc',
        image: '/assets/images/yhb.png',
        date: '5 tháng 10, 2024',
        price: 599000,
    },
    {
        id: 4,
        title: 'YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024',
        category: 'Âm nhạc',
        image: '/assets/images/yhb.png',
        date: '5 tháng 10, 2024',
        price: 599000,
    },
    {
        id: 5,
        title: 'YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024',
        category: 'Âm nhạc',
        image: '/assets/images/yhb.png',
        date: '5 tháng 10, 2024',
        price: 599000,
    },
    {
        id: 6,
        title: 'YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024',
        category: 'Âm nhạc',
        image: '/assets/images/yhb.png',
        date: '5 tháng 10, 2024',
        price: 599000,
    }
];

function CategoryButton({ category, onClick, isActive }) {
    return (
        <button
            className={`flex px-4 py-2 items-center rounded-[32px] border border-black ${isActive ? 'bg-[#1b1b1b] text-[#fafafa]' : 'bg-[#fafafa] text-[#1b1b1b]'}`}
            onClick={onClick}
        >
            {category}
        </button>
    );
}

function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

export default function Section({ title, categoryItems, maxCards }) {
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (categoryItems.length > 0) {
            setActiveCategory(categoryItems[0]);
        }
    }, [categoryItems]);

    useEffect(() => {
        const fetchEventData = async () => {
          const eventsData = await fetchAllEvents()
          setEvents(eventsData)
        }
        fetchEventData()
    }, [])
      
    const navigate = useNavigate()
    const handleNavigate = (event) => {
        window.scrollTo(0, 0);
        navigate(`/event-detail/${event.id}`);
    }

    const eventsToDisplay = events.slice(0, maxCards); 
    const chunkedEvents = chunkArray(eventsToDisplay, 3); 

    return (
        <div className='max-w-screen'>
            <div className="flex flex-col items-start gap-12 px-[120px] py-16 relative mx-auto w-full max-w-[1440px]">
                <div className="flex flex-col items-start gap-2">
                    <p className="text-5xl leading-[64px] text-[#1b1b1b] font-extrabold">{title}</p>
                    <div className="flex flex-row items-center gap-2">
                        {categoryItems.map((category, index) => (
                            <CategoryButton
                                key={index}
                                category={category}
                                isActive={category === activeCategory}
                                onClick={() => setActiveCategory(category)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {chunkedEvents.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex flex-row items-stretch gap-8">
                            {row.map((item) => (
                                <div key={item.id} className="flex-1">
                                    <EventCard event={item} onClick={() => handleNavigate(item)}/>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
