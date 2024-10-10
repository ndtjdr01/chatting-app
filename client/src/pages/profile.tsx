import { useEffect, useState, } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useUser } from "../context/user"
import EditInfo from "../component/editInfo"

const Profile = () => {
  const context = useUser()
  if (!context) throw new Error('not found context')
  const { user } = context
  const param = useParams()
  const authentication = user?._id === param.id
  const [data, setData] = useState<any>(null)
  const navigate = useNavigate()
  const [isEditInfo,setIsEditInfo] = useState(false)
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`http://localhost:3000/user/user-info/${param.id}`)
      if (res) {
        setData(res.data.data)
      }
    }
    fetchProfile()
  }, [param.id,user])
  return (
    <div className="border-l border-[#949494] w-full p-6 flex justify-center text-[white]">
      <div className="w-[700px]">

        <img className='bg-white rounded h-[50vh] w-full relative'
          src={`http://localhost:3000${data?.image?.background}`} alt="" />

        <div className="flex items-center mt-[20px] justify-between p-2">
          {/* avatar */}
          <div className="flex items-center gap-[30px] ">
            <img className="h-[100px] w-[100px] rounded-full border  "
              src={`http://localhost:3000${data?.image?.avatar}`} alt="" />
            <div className="font-semibold">{data && data.username}</div>
          </div>
          {/* button action */}
          {!authentication ?
            <div className="flex gap-2">
              <button className="bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-sm">+ Add</button>
              <button onClick={() => { navigate(`/chat/${data._id}`) }}
                className="bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-sm">Inbox</button>
            </div> :
            <button onClick={()=> setIsEditInfo(!isEditInfo)}
             className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-sm">
              edit</button>}
              {/* edit component */}
              {
                isEditInfo&&<EditInfo setIsEditInfo={setIsEditInfo} data={data}/>
              }
        </div>
        <div className="">
          <p className="text-center text-[#d8d8d8] font-bold">Intro</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
