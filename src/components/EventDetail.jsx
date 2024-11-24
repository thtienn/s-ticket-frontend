import { useParams } from 'react-router-dom';
import Banner from './ui/event-detail/banner';
import EventDescription from './ui/event-detail/event-description';
import EventList from './ui/event-detail/event-list';
import OrganizerInfo from './ui/event-detail/organizer-info';
import Footer from './ui/shared/footer';
import Header from './ui/shared/header';
import { useEffect, useState } from 'react';
import { fetchEventById } from '../controllers/eventController';

const EVENTS = [
    {
        id: 1,
        title: 'YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024',
        category: 'Âm nhạc',
        image: '/assets/images/yhb.png',
        date: '5 tháng 10, 2024',
        price: 599000,
        organizer:
        {
            name: 'Công Ty Cổ Phần Sự Kiện Và Truyền Thông Zone B',
            info: "Multimedia Communications | Event Organization | Production",
            logo: '/assets/images/yhb.png',
        },
        description:
      'Hoà bình đôi khi chỉ là một tiếng cười nhẹ, từ sự cho đi chân thành, một chút yêu thương, là sự thấu hiểu, và lắng nghe. \n Với thông điệp sâu sắc, chương trình sẽ đưa bạn qua những cảm xúc từ nhẹ nhàng đến mãnh liệt để hướng về những giấc mơ hoà bình.',
      shows: [
        {
            date: "4 tháng 10, 2024",
            time: "19:30 - 22:30",
            tickets: [
                { id: 1, name: 'VÉ RỐP RẺNG', price: 490000, description: 'Hạng vé ĐỨNG.', amount: 0 },
                { id: 2, name: 'VÉ THÔNG THẢ', price: 1120000, description: 'Hạng vé ngồi.', amount: 0 },
                { id: 3, name: 'VÉ SIÊU VIP', price: 5000000, description: 'Hạng vé VIP.', amount: 0 },
            ]
        },
        {
            date: "5 tháng 10, 2024",
            time: "19:30 - 22:30",
            tickets: [
                { id: 1, name: 'VÉ RỐP RẺNG', price: 490000, description: 'Hạng vé ĐỨNG.', amount: 1 },
                { id: 2, name: 'VÉ THÔNG THẢ', price: 1120000, description: 'Hạng vé ngồi.', amount: 0 },
                { id: 3, name: 'VÉ SIÊU VIP', price: 5000000, description: 'Hạng vé VIP.', amount: 0 },
            ]
        },
        {
            date: "6 tháng 10, 2024",
            time: "20:00 - 23:00",
            tickets: [
                {
                    name: "Vé phổ thông",
                    description: "Ghế ngồi tiêu chuẩn, không chọn chỗ trước.",
                    price: 490000,
                    amount: 150,
                },
                {
                    name: "Vé VIP",
                    description: "Ghế ngồi ở hàng đầu, tặng kèm quà lưu niệm.",
                    price: 990000,
                    amount: 30,
                },
                {
                    name: "Vé hậu trường",
                    description: "Trải nghiệm gặp gỡ nghệ sĩ sau buổi diễn.",
                    price: 1990000,
                    amount: 10,
                },
            ],
        },
        ]
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

export default function EventDetail() {
    const [event, setEvent] = useState([])
    const { id } = useParams()
    useEffect(() => {
        const fetchEventData = async () => {
          const eventData = await fetchEventById(id)
          setEvent(eventData)
        }
        fetchEventData()
    }, [])
    return (
        <div className="relative flex flex-col bg-[#fafafa] w-full overflow-x-hidden">
            <Header />
            <main className="flex-grow items-center justify-center w-full overflow-x-hidden">
                <Banner event={event[0]} />
                <div className='flex flex-col gap-12 w-full py-12 p-32'>
                    <EventDescription event={event[0]} />
                    <EventList event={event[0]} />
                    <OrganizerInfo event={event[0]} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
