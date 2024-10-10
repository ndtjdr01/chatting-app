import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useUser } from "../context/user"
import axios from "axios"
import { userType } from "./findUser"

const Nav = () => {

  const context = useUser()
  if (!context) throw new Error
  const location = useLocation()
  const param = location.pathname.split('/')[2]
  const navigate = useNavigate()
  // state
  const { setToken,token, user } = context
  const [listUsers, setListUsers] = useState<userType[] | null>(null)
  const [onAccount, setOnAccount] = useState(false)

  // function
  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/login')
    setOnAccount(false)
  }
  const toProfile = () => {
    navigate(`/profile/${user?._id}`);
    setOnAccount(false)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      if(!token) {
        return
      }
      try {
        const res = await axios.get(`http://localhost:3000/auth/users?page=1`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setListUsers(res.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [token])


  return (
    <div className="flex flex-col gap-4 p-2 w-1/5 h-[100vh]">
      {/* settting */}
      <div className="text-[13px] flex justify-between p-2 border-b">
        <p className="cursor-pointer "
          onClick={() => setOnAccount(!onAccount)}>Account</p>
        {onAccount &&
          <div className="bg-[#dfdfdf] top-[85px] rounded-md left-3 absolute p-2 cursor-pointer 
          text-black flex flex-col">
            <span className="text-black" onClick={handleLogout}>logout</span>
            <span onClick={toProfile}>your profile</span>
          </div>}
        <p>Setting</p>
      </div>
      {/* find contact */}
      <div className="flex flex-col gap-[30px]">
        <p className="text-center text-[white] font-semibold">List contact</p>
        {/* list */}
        <div className="flex flex-col gap-2 flex-1 overflow-scroll scroll-content items-start">
          {listUsers && listUsers.map((user, index) => {
            return (
              <div key={index} onClick={() => navigate(`/chat/${user._id}`)}
                className={
                  param === user._id ? 'cursor-pointer flex gap-2 justify-start items-center w-full rounded py-1 px-2 bg-[#777]'
                    : 'cursor-pointer flex gap-2 justify-start items-center w-full px-2 py-1'}>
                <img src={user?.image?`http://localhost:3000${user?.image?.avatar}`:'/assets/avatar-default.jfif'} className="border rounded-full w-[40px] h-[40px]" alt="" />
                <p className="font-semibold text-[14px]">{user.username}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Nav
