import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface User {
    userId: string;
    username: string;
    image:{
        background:string,
        avatar:string
    }
}

export interface UserContextType {
    user: any | null;
    setUser: (value: any) => void;
    token: string;
    setToken: (value: string) => void;
}

const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<any>('')
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/auth/profile`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }

        fetchUser();
    }, [token])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            setToken(token)
        }
    },[])
    // console.log(user)
    const context = {
        user,
        setUser,
        token,
        setToken
    }
    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
}