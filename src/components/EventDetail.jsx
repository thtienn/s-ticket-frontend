import { useParams } from 'react-router-dom';
import Banner from './ui/event-detail/banner';
import EventDescription from './ui/event-detail/event-description';
import EventList from './ui/event-detail/event-list';
import OrganizerInfo from './ui/event-detail/organizer-info';
import Footer from './ui/shared/footer';
import Header from './ui/shared/header';
import { useEffect, useState } from 'react';
import { fetchEventById } from '../controllers/eventController';

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
