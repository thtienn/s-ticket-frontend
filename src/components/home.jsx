import Footer from './ui/shared/footer';
import Section from './ui/home/section';
import Carousel from './ui/home/carousel';

const RECENT_CATEGORY = [
    {
        text: 'Tất cả',
        value: 'All'
    },
    {
        text: 'Mới nhất',
        value: 'Newest'
    }, 
    {
        text: 'Sắp diễn ra',
        value: 'Upcoming'
    }
];
const EVENT_CATEGORY = [
    {
        text: 'Tất cả',
        value: 'All'
    },
    {
        text: 'Âm nhạc',
        value: 'Music'
    },
    {
        text: 'Thể thao',
        value: 'Sport'
    },
    {
        text: 'Hội thảo',
        value: 'Seminar'
    },
    {
        text: 'Khác',
        value: 'Other'
    }
];

export default function Home() {
    return (
        <div className="relative min-h-[100dvh] bg-[#fafafa] w-full">
            {/* <Header /> */}
            <div className='relative z-0'>
                <div className='h-full w-full'>
                    <main className="flex-grow items-center justify-center flex flex-col w-full overflow-x-hidden">
                        <Carousel />
                        <Section title='SỰ KIỆN NỔI BẬT' categoryItems={RECENT_CATEGORY} maxCards={3} />
                        <Section title='SỰ KIỆN' categoryItems={EVENT_CATEGORY} />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
