import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useUser } from '../context/user';

const LoginComponent = ({ setType }: any) => {
  const context = useUser()
  if (!context) throw new Error
  const { setToken } = context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await axios.post(`http://localhost:3000/auth/login`, { password: password, username: username })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        navigate('/home');
      }
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        alert('Incorrect username or password');
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 mt-2 text-black border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='text-right text-blue-500 cursor-pointer'
            onClick={() => setType('signup')}>
            sign up
          </div>
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
