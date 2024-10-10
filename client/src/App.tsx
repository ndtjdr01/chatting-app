import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Nav from './component/nav';
import Chat from './pages/chat';
import Profile from './pages/profile';
import Header from './component/header';

const ProtectedLayout = () => {
  const isAuthenticated = () => !!localStorage.getItem('token');

  return isAuthenticated() ? (
    <>
      <Header />
      <div className='flex w-[calc(100vw - 10px)] gap-[10px] bg-[#333] text-[#d6d6d6]'>
        <Nav />
        <Outlet/>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  console.log(isAuthenticated())
  return (
    <Router>
      <Routes>
        {/* Routes không cần xác thực */}
        <Route path="/login" element={<Login />} />

        {/* Routes cần xác thực */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        {/* Redirect tất cả các route khác về login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;