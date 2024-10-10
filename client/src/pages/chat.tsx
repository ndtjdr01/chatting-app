import { FormEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useUser } from '../context/user'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const socket = io(`http://localhost:3003`)

const Chat = () => {
  const navigate = useNavigate()
  const context = useUser()
  if (!context) throw new Error
  const { user } = context
  const receiverId = useParams<any>().id
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [receiverInfo, setReceiverInfo] = useState<any>(null)
  const sentMessage = (e: FormEvent) => {
    e.preventDefault()
    socket.emit('newMessage', {
      sender: user?._id,
      receiver: receiverId,
      message: message,
    })
    setMessage('')
  }
  // console.log(messages)
  const deleteMessages = () => {
    socket.emit('deleteMessages', {
      sender: user?._id,
      receiver: receiverId,
    })
    setMessages([])
  }
  console.log(receiverInfo)
  useEffect(() => {
    const getReceiverInfo = async () => {
      try {
        if (!receiverId) return
        const res = await axios.get(`http://localhost:3000/user/user-info/${receiverId}`)
        setReceiverInfo(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getReceiverInfo()

    socket.on('getMessages', (m) => {
      if (m === null) return
      setMessages(m)
    })
    socket.on('newMessage', (m) => {
      setMessages((prev) => [...prev, m])
    })
    socket.on('deleteMessages', () => {
      console.log('deleted')
    })
    socket.emit('getMessages', {
      sender: user?._id,
      receiver: receiverId
    })
    return () => {
      socket.off('getMessages')
      socket.off('newMessage')
      socket.off('deleteMessages')
    }
  }, [user?._id, receiverId])
  return (
    // header
    <div className="flex flex-col justify-between flex-1 p-[30px] bg-[#7dcef3] gap-[10px] h-[100vh]">
      {/* header */}
      <div className='text-black flex justify-between'>
        <div className='flex items-center gap-2'>
          <span>chat with: </span>
          <p className='text-red-500 cursor-pointer font-semibold'
            onClick={() => navigate(`/profile/${receiverId}`)}>{receiverInfo?.username}</p>
        </div>
        <div className='flex gap-[50px]'>
          <button className='rounded bg-white px-2 py-1 hover:bg-[#ebebeb]'
            onClick={deleteMessages}>clear</button>
          <div onClick={() => navigate('/home')}
            className='px-2 py-1 cursor-pointer rounded bg-white hover:bg-[#ebebeb]'>
            back
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 mb-[10px] bg-white rounded text-black flex flex-col p-2 scroll-content overflow-scroll">
        {messages.length > 0 ? messages.map((msg, index) => (
          <div key={index} className="flex items-center gap-2">
           <p className='font-semibold text-[14px]'>{msg.senderName}:</p>
            <p className='flex-1'>{msg.message}</p>
          </div>))
          : <p className='mt-[100px ] text-[gray] italic text-center'>let 's chat something funny</p>}
      </div>

      {/* chat input */}
      <div className="w-full">
        <form action="" className="flex">
          <input type="text" className="flex-1 p-3 border border-[#ccc] rounded outline-none text-[#5f5f5f]"
            placeholder="type something here ..." onChange={(e) => setMessage(e.target.value)} value={message} />
          <button type="submit" className="rounded-sm text-[13px] font-semibold bg-[#00A7DD] 
                    px-2 py-1 text-white" onClick={sentMessage}>
            Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat
