import Sidebar from "../ui/my-events/sidebar";
import { useState, useEffect } from "react";
import { fetchUser } from "../../controllers/userController";

export default function MyEvents() {
    const [session, setSession] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchUserData = async () => {
            const { userData, sessionStatus } = await fetchUser();
            if (sessionStatus) {
                setSession(true);
            }
            setLoading(false); 
        };
        fetchUserData();
    }, []);

    if (loading) {
        return null; 
    }

    if (!session) {
        return <div className="text-black">Cần đăng nhập để xem trang này</div>;
    }

    return (
        <div className="relative min-h-[100dvh] bg-[#fafafa] w-full overflow-hidden">
            <Sidebar />
        </div>
    );
}
