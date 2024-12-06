import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import Button from "../shared/button";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Carousel = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate()

  // Fetch events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("image, shows, id")
        .match({ approveStatus: 'approved' });
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
            <SwiperSlide key={index} onClick={() => navigate(`/ticket-details/${event.id}`)}>
              <div className="bg-transparent lg:w-[849px] lg:h-[485px]  md:h-[485px] rounded-2xl overflow-hidden relative hover:cursor-pointer">
                <img
                  src={event.image}
                  alt="event-cover"
                  className="object-cover w-[849px] h-[485px] z-0 border-8 rounded-3xl border-[#fcfcfc] border-opacity-60"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0.08)] via-[rgba(30,27,27,0.30)] to-[rgba(0,0,0,0.30)] rounded-3xl"></div>
                <div className="absolute w-[754px] bottom-0 left-0 mx-12 mb-6 z-20 flex flex-row items-center justify-between text-base text-white font-bold">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex flex-row items-center gap-3 text-white">
                      <svg width="15" height="14" viewBox="0 0 15 14" fill="#fafafa" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.386 6.27087C13.6252 6.27087 13.8235 6.07254 13.8235 5.83337V5.25004C13.8235 2.67754 13.0418 1.89587 10.4693 1.89587H6.8235V3.20837C6.8235 3.44754 6.62516 3.64587 6.386 3.64587C6.14683 3.64587 5.9485 3.44754 5.9485 3.20837V1.89587H4.636C2.0635 1.89587 1.28183 2.67754 1.28183 5.25004V5.54171C1.28183 5.78087 1.48016 5.97921 1.71933 5.97921C2.27933 5.97921 2.74016 6.44004 2.74016 7.00004C2.74016 7.56004 2.27933 8.02087 1.71933 8.02087C1.48016 8.02087 1.28183 8.21921 1.28183 8.45837V8.75004C1.28183 11.3225 2.0635 12.1042 4.636 12.1042H5.9485V10.7917C5.9485 10.5525 6.14683 10.3542 6.386 10.3542C6.62516 10.3542 6.8235 10.5525 6.8235 10.7917V12.1042H10.4693C13.0418 12.1042 13.8235 11.3225 13.8235 8.75004C13.8235 8.51087 13.6252 8.31254 13.386 8.31254C12.826 8.31254 12.3652 7.85171 12.3652 7.29171C12.3652 6.73171 12.826 6.27087 13.386 6.27087ZM6.8235 8.26587C6.8235 8.50504 6.62516 8.70337 6.386 8.70337C6.14683 8.70337 5.9485 8.50504 5.9485 8.26587V5.73421C5.9485 5.49504 6.14683 5.29671 6.386 5.29671C6.62516 5.29671 6.8235 5.49504 6.8235 5.73421V8.26587Z" fill="#FAFAFA" />
                      </svg>
                      {/* <img src="/assets/icons/ticket.svg" alt="ticket" /> */}
                      <span>{eventDetails.price === null ? "Chưa có" : eventDetails.price} VND</span>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      {/* <img src="/assets/icons/calendar.svg" alt="calendar" /> */}
                      <svg width="15" height="14" viewBox="0 0 15 14" fill="#fafafa" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3235 2.07663V1.16663C10.3235 0.927459 10.1252 0.729126 9.88601 0.729126C9.64685 0.729126 9.44851 0.927459 9.44851 1.16663V2.04163H5.65685V1.16663C5.65685 0.927459 5.45851 0.729126 5.21935 0.729126C4.98018 0.729126 4.78185 0.927459 4.78185 1.16663V2.07663C3.20685 2.22246 2.44268 3.16163 2.32601 4.55579C2.31435 4.72496 2.45435 4.86496 2.61768 4.86496H12.4877C12.6568 4.86496 12.7968 4.71913 12.7793 4.55579C12.6627 3.16163 11.8985 2.22246 10.3235 2.07663Z" fill="#fafafa" />
                        <path d="M12.2193 5.73999H2.88601C2.56517 5.73999 2.30267 6.00249 2.30267 6.32332V9.91666C2.30267 11.6667 3.17767 12.8333 5.21934 12.8333H9.88601C11.9277 12.8333 12.8027 11.6667 12.8027 9.91666V6.32332C12.8027 6.00249 12.5402 5.73999 12.2193 5.73999ZM5.92517 10.6225C5.89601 10.6458 5.86684 10.675 5.83767 10.6925C5.80267 10.7158 5.76767 10.7333 5.73267 10.745C5.69767 10.7625 5.66267 10.7742 5.62767 10.78C5.58684 10.7858 5.55184 10.7917 5.51101 10.7917C5.43517 10.7917 5.35934 10.7742 5.28934 10.745C5.21351 10.7158 5.15517 10.675 5.09684 10.6225C4.99184 10.5117 4.92767 10.36 4.92767 10.2083C4.92767 10.0567 4.99184 9.90499 5.09684 9.79416C5.15517 9.74166 5.21351 9.70082 5.28934 9.67166C5.39434 9.62499 5.51101 9.61332 5.62767 9.63666C5.66267 9.64249 5.69767 9.65416 5.73267 9.67166C5.76767 9.68332 5.80267 9.70082 5.83767 9.72416C5.86684 9.74749 5.89601 9.77082 5.92517 9.79416C6.03017 9.90499 6.09434 10.0567 6.09434 10.2083C6.09434 10.36 6.03017 10.5117 5.92517 10.6225ZM5.92517 8.58082C5.81434 8.68582 5.66267 8.74999 5.51101 8.74999C5.35934 8.74999 5.20767 8.68582 5.09684 8.58082C4.99184 8.46999 4.92767 8.31832 4.92767 8.16666C4.92767 8.01499 4.99184 7.86332 5.09684 7.75249C5.26017 7.58916 5.51684 7.53666 5.73267 7.62999C5.80851 7.65916 5.87267 7.69999 5.92517 7.75249C6.03017 7.86332 6.09434 8.01499 6.09434 8.16666C6.09434 8.31832 6.03017 8.46999 5.92517 8.58082ZM7.96684 10.6225C7.85601 10.7275 7.70434 10.7917 7.55267 10.7917C7.40101 10.7917 7.24934 10.7275 7.13851 10.6225C7.03351 10.5117 6.96934 10.36 6.96934 10.2083C6.96934 10.0567 7.03351 9.90499 7.13851 9.79416C7.35434 9.57832 7.75101 9.57832 7.96684 9.79416C8.07184 9.90499 8.13601 10.0567 8.13601 10.2083C8.13601 10.36 8.07184 10.5117 7.96684 10.6225ZM7.96684 8.58082C7.93767 8.60416 7.90851 8.62749 7.87934 8.65082C7.84434 8.67416 7.80934 8.69166 7.77434 8.70332C7.73934 8.72082 7.70434 8.73249 7.66934 8.73832C7.62851 8.74416 7.59351 8.74999 7.55267 8.74999C7.40101 8.74999 7.24934 8.68582 7.13851 8.58082C7.03351 8.46999 6.96934 8.31832 6.96934 8.16666C6.96934 8.01499 7.03351 7.86332 7.13851 7.75249C7.19101 7.69999 7.25517 7.65916 7.33101 7.62999C7.54684 7.53666 7.80351 7.58916 7.96684 7.75249C8.07184 7.86332 8.13601 8.01499 8.13601 8.16666C8.13601 8.31832 8.07184 8.46999 7.96684 8.58082ZM10.0085 10.6225C9.89767 10.7275 9.74601 10.7917 9.59434 10.7917C9.44267 10.7917 9.29101 10.7275 9.18017 10.6225C9.07517 10.5117 9.01101 10.36 9.01101 10.2083C9.01101 10.0567 9.07517 9.90499 9.18017 9.79416C9.39601 9.57832 9.79267 9.57832 10.0085 9.79416C10.1135 9.90499 10.1777 10.0567 10.1777 10.2083C10.1777 10.36 10.1135 10.5117 10.0085 10.6225ZM10.0085 8.58082C9.97934 8.60416 9.95017 8.62749 9.92101 8.65082C9.88601 8.67416 9.85101 8.69166 9.81601 8.70332C9.78101 8.72082 9.74601 8.73249 9.71101 8.73832C9.67017 8.74416 9.62934 8.74999 9.59434 8.74999C9.44267 8.74999 9.29101 8.68582 9.18017 8.58082C9.07517 8.46999 9.01101 8.31832 9.01101 8.16666C9.01101 8.01499 9.07517 7.86332 9.18017 7.75249C9.23851 7.69999 9.29684 7.65916 9.37267 7.62999C9.47767 7.58332 9.59434 7.57166 9.71101 7.59499C9.74601 7.60082 9.78101 7.61249 9.81601 7.62999C9.85101 7.64166 9.88601 7.65916 9.92101 7.68249C9.95017 7.70582 9.97934 7.72916 10.0085 7.75249C10.1135 7.86332 10.1777 8.01499 10.1777 8.16666C10.1777 8.31832 10.1135 8.46999 10.0085 8.58082Z" fill="#fafafa" />
                      </svg>
                      <span>{eventDetails.startDate === null ? "Chưa có" : eventDetails.startDate}</span>
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
