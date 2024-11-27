import { Link, useNavigate } from "react-router-dom";
import Button from "./button";
import Logo from "./logo";

const NAV_ITEMS = [
    {
        title: "Trang chủ",
        icon: "home",
        link: "/",
    },
    {
        title: "Vé đã mua",
        icon: "ticket",
        link: "/my-tickets",
    },
    {
        title: "Sự kiện của tôi",
        icon: "calendar",
        link: "/my-events",
    }
]

const NavItem = ({ title, icon, link, isActive }) => {
    return (
        <div className="flex py-2 pl-3 pr-[14px] items-center justify-center gap-[6px] hover:cursor-pointer">
            <img src={`/assets/icons/${icon}.svg`} alt={icon} width={14} height={14} />
            <Link to={link}>
                <a className={`${isActive ? 'text-[#219ce4]' : 'text-[#1b1b1b]'} text-base font-semibold`}>{title}</a>
            </Link>
        </div>
    );
};

export default function Header() {
    const navigate = useNavigate()

    const handleNavigate = () => {
        window.scrollTo(0, 0);
        navigate(`/add-event`)
    }
    return (
        <div className="max-w-screen sticky inset-0 z-10 bg-[#fafafa] shadow-[0_1px_2px_0px_rgba(0,0,0,0.1)]">
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-row items-center justify-between px-12 py-3">
                <div className="flex items-center gap-6">
                    <Logo title="s-ticket" image={'logo'} textColor={'#1b1b1b'} />
                    <div className="flex items-center gap-3">
                        {NAV_ITEMS.map((item, index) => (
                            <NavItem key={index} title={item.title} icon={item.icon} link={item.link} isActive={item.link === window.location.pathname} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-8">
                    <Button title={'Tạo sự kiện'} bgColor={'#219ce4'} textColor={'#fafafa'} icon={'add-circle'} isActive onClick={handleNavigate} />
                    <div className="bg-black w-[1px] h-4"></div>
                    <div className="flex flex-row items-center gap-6">
                        <Button title={'Đăng nhập'} bgColor={'#fafafa'} textColor={'#1b1b1b'} />
                        <Button title={'Đăng ký'} bgColor={'#fafafa'} textColor={'#1b1b1b'} />
                    </div>
                </div>
            </div>
        </div>
    )
}