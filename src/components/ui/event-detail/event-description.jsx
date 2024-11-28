export default function EventDescription({ event }) {
  return (
    <div className="flex flex-col gap-5 w-full text-[#1b1b1b]">
      <span className="text-2xl font-bold">GIỚI THIỆU SỰ KIỆN</span>
      <div className="text-base border border-black rounded-2xl whitespace-pre-line p-8">{event?.description}</div>
    </div>
  );
}
  