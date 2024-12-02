import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import Button from "../shared/button";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Carousel = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("image, shows");
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  const getEventDetails = (shows) => {
    if (!shows || shows.length === 0) return { price: 0, startDate: null };

    let minPrice = Infinity;
    let earliestDate = null;

    shows.forEach((show) => {
      const showPrice = show.ticket_types.reduce(
        (min, ticket) => Math.min(min, ticket.price),
        Infinity
      );
      if (showPrice < minPrice) {
        minPrice = showPrice;
      }

      const showDate = new Date(show.start_date + "T" + show.start_time);
      if (!earliestDate || showDate < new Date(earliestDate)) {
        earliestDate = show.start_date;
      }
    });

    return {
      price: minPrice.toLocaleString(),
      startDate: earliestDate,
    };
  };

  return (
    <div className="w-full bg-[#219ce4] py-16 px-[120px]">
      <Swiper
        navigation
        // loop={true}
        slidesPerView={1.5}
        spaceBetween={0}
        centeredSlides={true}
        modules={[Navigation, EffectCoverflow, Pagination]}
        className="w-full h-full max-w-[1280px] mx-auto flex-shrink-0 relative"
        effect="coverflow"
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 30,
          modifier: 50,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
      >
        {events.map((event, index) => {
          const eventDetails = getEventDetails(event.shows);
          return (
            <SwiperSlide key={index}>
              <div className="bg-transparent w-[849px] h-[485px] rounded-2xl overflow-hidden relative">
                <img
                  src={event.image}
                  alt="event-cover"
                  className="object-fill z-0 border-8 rounded-3xl border-[#fcfcfc] border-opacity-60"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0.08)] via-[rgba(30,27,27,0.30)] to-[rgba(0,0,0,0.30)] rounded-3xl"></div>
                <div className="absolute w-[754px] bottom-0 left-0 mx-12 mb-6 z-20 flex flex-row items-center justify-between text-base text-white font-bold">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex flex-row items-center gap-3">
                      <img src="/assets/icons/ticket.svg" alt="ticket-price" />
                      <span>{eventDetails.price} VND</span>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <img src="/assets/icons/calendar.svg" alt="calendar" />
                      <span>{eventDetails.startDate}</span>
                    </div>
                  </div>
                  <Button
                    title={"Xem chi tiết"}
                    textColor={"#fafafa"}
                    bgColor={"#1b1b1b"}
                    icon={"category"}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
