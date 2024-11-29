import { useParams } from 'react-router-dom';
import Banner from './ui/event-detail/banner';
import EventDescription from './ui/event-detail/event-description';
import EventList from './ui/event-detail/event-list';
import OrganizerInfo from './ui/event-detail/organizer-info';
import Footer from './ui/shared/footer';
import { useEffect, useState } from 'react';
import { fetchEventById } from '../controllers/eventController';

export default function EventDetail() {
    const [event, setEvent] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        const fetchEventData = async () => {
          const eventData = await fetchEventById(id)
          setEvent(eventData)
        }
        fetchEventData()
    }, [])
    return (
        <div className="relative text-start flex flex-col bg-[#fafafa] w-full overflow-x-hidden">
            <main className="flex-grow items-center justify-center w-full overflow-x-hidden">
                <Banner event={event} />
                <div className='flex flex-col gap-12 w-full py-12 p-32'>
                    <EventDescription event={event} />
                    <EventList event={event} />
                    <OrganizerInfo event={event} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
