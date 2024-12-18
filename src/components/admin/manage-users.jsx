import AdminSidebar from "../ui/admin/sidebar"
import { useEffect, useState } from "react"

function RoleButton({ role, onClick, isActive }) {
    return (
        <button
            className={`flex px-4 py-2 items-center rounded-[32px] border border-black ${isActive ? 'bg-[#1b1b1b] text-[#fafafa]' : 'bg-[#fafafa] text-[#1b1b1b] hover:bg-[#d9d9d9]'}`}
            onClick={onClick}
        >
            {role}
        </button>
    );
}

export default function ManageUsers() {
    const [activeRole, setActiveRole] = useState('Tất cả');
    const [users, setUsers] = useState([]);
    const [fileredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/user');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [])

    const handleUserStatus = (role) => {
        setActiveRole(role)
        let filtered;
        switch (role) {
            case 'Tất cả':
                filtered = users;
                break;
            case 'Quản trị viên':
                filtered = users.filter(user => user.role === 'Admin');
                break;
            case 'Khách hàng':
                filtered = users.filter(user => user.role === 'User');
                break;
            default:
                filtered = users;
                break;
        }
        setFilteredUsers(filtered);
    }

    function UserItem({ user }) {
        const UserBadge = ({ role }) => {
            return (
                <div
                    className={`px-4 py-1 rounded-2xl text-xs font-semibold ${
                        role === 'User'
                            ? 'bg-[#f2e5cf] border-2 border-[#f2ae39] text-[#f2ae39]'
                            : 'bg-[#fbcccc] border-2 border-[#f87474] text-[#f87474]'
                    }`}
                >
                    {role === 'User'
                        ? 'Khách hàng'
                        : 'Quản trị viên'}
                </div>
            )
        }

        const handleRoleChange = async (user_id, role) => {
            try {
                const response = await fetch(`http://localhost:3000/user/${user_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ role })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to update user role');
                }
                
                const updatedUsers = users.map(user => user.id === user_id ? { ...user, role: role } : user);
                setUsers(updatedUsers);
                handleUserStatus(activeRole);
            } catch (error) {
                console.error('Error updating user role:', error);
            }
        }

        const handleRemoveUser = async (user_id) => {
            try {
                const response = await fetch(`http://localhost:3000/user/${user_id}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                
                const updatedUsers = users.filter(user => user.id !== user_id);
                setUsers(updatedUsers);
                handleUserStatus(activeRole);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    
        return (
            <div className="w-full flex flex-row items-start justify-between py-5 px-6 rounded-xl border border-black hover:cursor-pointer hover:bg-[#d9d9d9]">
            <div className="flex flex-col items-start gap-1">
                <p className="font-bold text-lg">{user.name}</p>
                <p className="font-normal text-base">Email: {user.email}</p>
                <p className="font-normal text-base">Lần cuối hoạt động: </p>
            </div>
            <div className="flex flex-col items-end gap-4">
                <UserBadge role={user.role} />
                <div className="flex flex-row items-center gap-2">
                {user.role !== 'Admin' && (
                    <button className="text-white bg-[#219ce4] px-4 py-2 rounded-lg" onClick={() => handleRoleChange(user.id, "Admin")}>Cấp quyền</button>
                )}
                {user.role === 'Admin' && (
                    <button className="text-white bg-[#f24b4b] px-4 py-2 rounded-lg" onClick={() => handleRoleChange(user.id, "User")}>Hủy quyền</button>
                )}
                <button className="text-white bg-[#1b1b1b] px-4 py-2 rounded-lg" onClick={() => handleRemoveUser(user.id)}>Xóa</button>
                </div>
            </div>
            </div>
        )
    }

    return (
        <div className="flex-1 min-h-0 max-h-[calc(100vh-76px)] bg-[#fafafa] w-full flex flex-row gap-5 items-start overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-col items-start gap-3 w-full py-7 px-5 text-[#1b1b1b] overflow-hidden">
                <p className="text-2xl font-extrabold">Tất cả người dùng</p>
                <div className="flex flex-row items-center gap-2">
                    {['Tất cả', 'Quản trị viên', 'Khách hàng'].map((role, index) => (
                        <RoleButton
                            key={index}
                            role={role}
                            isActive={role === activeRole}
                            onClick={() => handleUserStatus(role)}
                        />
                    ))}
                </div>
                <div className="my-2 flex flex-col items-start gap-2 w-full h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide">
                    {fileredUsers?.map((user, index) => (
                        <UserItem key={index} user={user} />
                    ))}
                </div>
            </div>
        </div>
    )
}