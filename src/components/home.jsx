import Footer from './ui/shared/footer';
import Header from './ui/shared/header';
import Section from './ui/home/section';

const RECENT_CATEGORY = ['Tất cả', 'Âm nhạc', 'Thể thao', 'Seminar', 'Khác'];
const EVENT_CATEGORY = ['Tất cả', 'Âm nhạc', 'Thể thao', 'Seminar', 'Khác'];

export default function Home() {
    return (
        <div className="relative flex flex-col bg-[#fafafa] w-full overflow-x-hidden">
            <Header />
            <main className="flex-grow items-center justify-center flex flex-col w-full overflow-x-hidden">
                <Section title='ĐÃ XEM GẦN ĐÂY' categoryItems={RECENT_CATEGORY} maxCards={3} />
                <Section title='SỰ KIỆN' categoryItems={EVENT_CATEGORY} maxCards={6} />
            </main>
            <Footer />
        </div>
    );
}
