
import { useUser } from "../context/user";
import FindUser from "../component/findUser";

const Home = () => {
    const context = useUser()
    if (!context) throw new Error
    const { user } = context
console.log(user)
    return (
        <div className="flex flex-col justify-between flex-1 p-4 bg-[#f0efef] gap-[10px] h-[100vh]">
            {/* title */}
            <div className="text-black">
                hello, <span className="italic font-semibold">{user?.username}</span>
            </div>
           
            <div className="border flex-1 rounded-md p-4 bg-[white] ">
                <FindUser />
            </div>
        </div>
    )
}

export default Home
