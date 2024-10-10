import { useEffect, useState } from "react"
// import { io } from "socket.io-client"
import axios from "axios"
import { useNavigate } from "react-router-dom";
// const socket = io('http://localhost:3003')
export interface userType {
    image:any;
    _id: string;
    username: string;
}

const FindUser = () => {
    const [listUsers, setListUsers] = useState<userType[] | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/auth/users?page=1`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setListUsers(res.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUsers()
    }, [])  

    return (
        <div className="text-[#333]">
            <p className="text-center">Find contact</p>
            <div className="grid grid-cols-5 gap-1 mt-[30px]">
                {listUsers && listUsers.map((user, index) => {
                    return (
                        <div key={index}  onClick={()=>navigate(`/profile/${user._id}`)}
                        className="cursor-pointer flex flex-col gap-1 justify-center items-center">
                            <img src={user?.image?`http://localhost:3000${user?.image?.avatar}`:'/assets/avatar-default.jfif'} className="border rounded-full w-[50px] h-[50px]" alt="" />
                            <p className="font-semibold text-[14px]">{user.username}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FindUser
