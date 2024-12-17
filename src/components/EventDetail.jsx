import { useParams } from 'react-router-dom';
import Banner from './ui/event-detail/banner';
import EventDescription from './ui/event-detail/event-description';
import EventList from './ui/event-detail/event-list';
import OrganizerInfo from './ui/event-detail/organizer-info';
import Footer from './ui/shared/footer';
import { useEffect, useState, useRef } from 'react';
import { fetchEventById } from '../controllers/eventController';

export default function EventDetail() {
    const [event, setEvent] = useState(null)
    const { id } = useParams()
    const descriptionRef = useRef(null);
    const handleScrollToDescription = () => {
        descriptionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        const fetchEventData = async () => {
            const eventData = await fetchEventById(id)
            setEvent(eventData)
        }
        fetchEventData()
    }, [])
    return (
        <div className="relative min-h-[100dvh] bg-[#fafafa] w-full">
            <div className='relative z-0'>
                <div className="h-full w-full">
                    <main className="flex-grow flex flex-col w-full overflow-x-hidden">
                        <Banner event={event} onScrollToDescription={handleScrollToDescription} />
                        <EventDescription event={event} />
                        <div ref={descriptionRef}> {/* Đặt ref tại đây */}
                            <EventList event={event} />
                        </div>
                        <OrganizerInfo event={event} />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
