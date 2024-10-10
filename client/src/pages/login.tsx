import { useState } from "react";
import Signup from "../component/signup";
import LoginComponent from "../component/login";


const Login = () => {
  const [type,setType] = useState('login')
  
  return (
    <div className="fixed w-full">
      {type==='login' && <LoginComponent setType={setType}/>}
      {type==='signup' && <Signup setType={setType}/>}
    </div>
  );
};

export default Login;
