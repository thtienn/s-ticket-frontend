export default function Banner({ event, onScrollToDescription }) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
            <span>{new Date(event?.date).toLocaleDateString(undefined, options)} </span>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className='font-bold'>Giá vé từ</span>
              <span className="text-2xl font-bold text-[#219CE4]">
                {event?.price.toLocaleString()} VND
              </span>
            </div>
            <button className="bg-[#1B1B1B] text-[#FAFAFA] w-full px-4 py-2 rounded-2xl" onClick={onScrollToDescription}>
              Mua vé ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
