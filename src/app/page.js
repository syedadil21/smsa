'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter()

  const handleLogin = () => {
    if(email === "test1@gmail.com" || email === "test2@gmail.com")
    {
      if(password==='test123')
      {
        router.push("/timeline");
        localStorage.setItem("email", email);
      }
      else
      {
        alert("Incorrect email or password, try again!")
      }
    }
    else
    {
      alert("Incorrect email or password, try again!") 
    }
  }
  return (
    <>
    <div className="w-full  flex flex-col items-center bg-[#C8C8BE] h-[100vh] py-40">

      <h1 className="text-5xl font-bold">Social Media Sentiment Analysis</h1>
      <h2 className="text-2xl font-light">Get to know the intent of the user</h2>
      <div className=" flex flex-col my-2">
        <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="border-2 my-2 border-gray-600 rounded-xl p-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="border-2 my-2 border-gray-600 rounded-xl p-2" />
      </div>
      <input type="button" value="Login" onClick={handleLogin} className="bg-white rounded-full p-3 hover:cursor-pointer px-10" />
    </div>
    </>
  );
}
