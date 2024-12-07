import Button from '../shared/button'

export default function Banner({ event }) {
    return (
      <div className="bg-[#219CE4] p-12 w-full overflow-hidden">
        <div className="relative flex justify-center">
          <img
            src={event?.image}
            alt={event?.name}
            className="w-1/2 object-cover shadow-md"
          />
          <div className="bg-[#FAFAFA] text-[#1B1B1B] p-5 w-1/3 shadow-md flex flex-col justify-between text-base">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">{event?.name}</span>
              <span>{event?.organizerName}</span>

              {/* <span>{event?.start_time}</span> */}

            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className='font-bold'>Giá vé từ</span>
                <span className="text-2xl font-bold text-[#219CE4]">

                  {event?.price.toLocaleString()} VND
                  
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-end justify-between mb-5">
            <p className="text-black text-[16px] leading-[12px] font-bold">Giá vé từ</p>
            <p className="text-[#219ce4] text-[32px] leading-[22px] font-bold">{eventDetails.price} VND</p>
          </div>
          <Button
            title="Mua vé ngay"
            bgColor="#1b1b1b"
            textColor="#fff"
            onClick={() => {
              const section = document.getElementById('event-list');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
