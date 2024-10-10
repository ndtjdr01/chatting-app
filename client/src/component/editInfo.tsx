import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useUser } from '../context/user'


const EditInfo = ({ setIsEditInfo }: any) => {
    const context = useUser()
    if (!context) throw new Error
    const { user, setUser } = context
    const [inputValue, setInputValue] = useState<any>({
        username: user?.username,
        avatar: user?.image.avatar,
    
        background: ''
    })

    console.log(user)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', inputValue.username)
        formData.append('background', inputValue.background)
        formData.append('avatar', inputValue.avatar)
        try {
            const res = await axios.post(`http://localhost:3000/upload`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': "multipart/form-data"
                    }
                },
            )
            if (res.status === 201) {
                setIsEditInfo(false)
                console.log(res.data)
                setUser({ ...user, image: { background: res.data.background, avatar: res.data.avatar } })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] bg-[#00000090]'>
            <form className='bg-[white] flex flex-col gap-3 p-4 text-black w-[300px] h-[340px] rounded-md relative'>
                <p className='absolute top-0 text-[16px] p-2 right-1 cursor-pointer' onClick={() => setIsEditInfo(false)}>x</p>
                <p className='text-center font-semibold p-2'>Edit your info</p>
                <div className='flex gap-2'>
                    <p>username: </p>
                    <input required value={inputValue.username} onChange={(e) => { setInputValue({ ...inputValue, username: e.target.value }) }}
                        className='w-full border border-[#333] rounded px-2'
                        type="text" placeholder='username' />
                </div>
                <div className='flex flex-col gap-1'>
                    <p>avatar: </p>
                    <input  required onChange={(e) => { setInputValue({ ...inputValue, avatar: e.target.files?.[0] }) }}
                        type="file" placeholder='username' />
                </div>
                <div className='flex flex-col gap-1'>
                    <p>background: </p>
                    <input required onChange={(e) => { setInputValue({ ...inputValue, background: e.target.files?.[0] }) }}
                        type="file" placeholder='username' />
                </div>
                <div className='text-center mt-[20px]'>
                    <button className='px-2 rounded py-1 bg-blue-500 hover:bg-blue-600 text-[white]' onClick={handleSubmit}
                    >submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditInfo
