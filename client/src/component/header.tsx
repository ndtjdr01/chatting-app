import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="flex bg-[#161616] text-[#c2c2c2] px-4 text-[14px] gap-[20px]">
      <div onClick={()=>{navigate('/home')}} className="cursor-pointer hover:text-[white] py-1 px-3">Home</div>
      {/* <div className="cursor-pointer hover:text-[white] py-1 px-3">Friend</div> */}
      {/* <div className="cursor-pointer hover:text-[white] py-1 px-3">Chat</div> */}
    </div> 
  )
}

export default Header
