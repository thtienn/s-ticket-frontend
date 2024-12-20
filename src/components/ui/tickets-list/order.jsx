import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { updateStatusOrder } from "../../../controllers/orderController";

const Order = ({ order }) => {
    const qrRef = useRef(null);

    const handleCancel = async () => {
        try {
            const isConfirmed = window.confirm("Bạn có chắc chắn muốn lưu thay đổi?");
            if (isConfirmed) {
                await updateStatusOrder(order);
                order.status = 'CANCELLED';
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveQR = async () => {
        try {
            if (qrRef.current) {
                const dataUrl = await toPng(qrRef.current);
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `${order.event.name || "qr-code"}.png`;
                link.click();
            }
        } catch (error) {
            console.error("Error saving QR code:", error);
        }
    };

    const formattedDateTime = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            const dateOptions = { day: '2-digit', month: 'long', year: 'numeric' };
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const dateFormatter = new Intl.DateTimeFormat('vi-VN', dateOptions);
            const timeFormatter = new Intl.DateTimeFormat('vi-VN', timeOptions);
            return ` ${timeFormatter.format(date)} - ${dateFormatter.format(date)}`;
        }
        return '';
    };

    const getButtonClasses = () => {
        switch (order.status) {
            case 'CANCELLED':
                return 'bg-[#ff4d4f] text-[#FAFAFA] cursor-not-allowed';
            case 'USED':
                return 'bg-green-500 text-[#FAFAFA] cursor-not-allowed';
            default:
                return 'bg-blue-500 text-[#FAFAFA] cursor-not-allowed';
        }
    };

    const getButtonText = () => {
        switch (order.status) {
            case 'CANCELLED':
                return 'Đã hủy';
            case 'USED':
                return 'Đã dùng';
            default:
                return 'Chưa dùng';
        }
    };

    return (
        <div className="flex flex-1 w-full bg-[#1b1b1b] text-[#FAFAFA] rounded-xl justify-between p-4 text-base font-normal">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-bold text-[#219ce4]">{order.event.name}</div>
                <div className="flex gap-2">
                    <span>Thời gian bắt đầu:</span>
                    <span className="font-semibold">{formattedDateTime(order.miniEvent.startTime)}</span>
                </div>
                <div className="flex gap-2">
                    <span>Thời gian kết thúc:</span>
                    <span className="font-semibold">{formattedDateTime(order.miniEvent.endTime)}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span>Chi tiết vé:</span>
                    <div>
                        <div className="italic font-semibold">{`${order.ticketRank.rankName} x1`}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span>Tổng tiền:</span>
                    <span className="font-semibold">{`${order.ticketRank.price.toLocaleString() || ''} VNĐ`}</span>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-end">
                <button
                    disabled={order.status === 'CANCELLED' || order.status === 'USED'}
                    className={`text-center rounded-md font-semibold py-1 px-3 max-w-28 ${getButtonClasses()}`}
                    onClick={handleCancel}
                >
                    {getButtonText()}
                </button>
                <div className="flex items-center gap-4">
                    {/* Save Button */}
                    <div
                        onClick={handleSaveQR}
                        className="bg-[#219ce4] rounded-full p-2 hover:bg-sky-400"
                    >
                        <img src="/assets/icons/down-line.svg" alt="download" />
                    </div>
                    {/* QR Code Container */}
                    <div ref={qrRef} className="bg-[#FAFAFA] p-2 rounded-lg">
                        <QRCodeCanvas
                            value={JSON.stringify({
                                order_id: order.id,
                                event_title: order.event.name,
                                ticket_rank: order.ticketRank.rankName,
                                price: order.ticketRank.price,
                            })}
                            size={128}
                            bgColor="#ffffff"
                            fgColor="#000000"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
