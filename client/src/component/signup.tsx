import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setType }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      const res = await axios.post(`http://localhost:3000/auth/register`, { password: password, username: username })
      if (res.status === 201) {
        alert('Registration successful! You can now log in.');
        setType('login');
      }
    } catch (error:any) {
      if (error.response && error.response.status === 409) {
        alert(`${error.response.data.message}`);
      } else {
        alert(`${error.response.data.message}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="text-[#333] w-full px-4 py-2 mt-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
              className="text-[#333] w-full px-4 py-2 mt-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="text-[#333] w-full px-4 py-2 mt-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className='text-right text-blue-500 cursor-pointer'
            onClick={() => setType('login')}>
            login
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
