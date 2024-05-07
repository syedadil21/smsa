'use client'

import Image from 'next/image'
// import img1 from '../../../public/capture.png'
// import img2 from '../../../public/capture1.png'
// import img3 from '../../../public/capture.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// const samplePosts = []

const page = () => {

    const [posts, setPosts] = useState([])
    const [email, setEmail] = useState("") 
    const [enteredContent, setEnteredContent] = useState("")
    const router = useRouter();

    useEffect(() => {
      
        const item = localStorage.getItem("email");
        setEmail(item);
        console.log(item);
        
    }, [])
    

    const getResult = async (content) => {

        const options = {
          method: 'POST',
          url: 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'ae5456417dmsh401fb135c4d1487p12e642jsn2a370e4bfa01',
            'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
          },
          data: {
            language: 'english',
            text: content
          }
        };
        
        try {
            const response = await axios.request(options);
            console.log(response.data.sentiment);
            return response.data.sentiment;
        } catch (error) {
            console.error(error);
        }

    }

    const handleAddPost = async () => {
        if(enteredContent !== "")
        {
            const sentiment = await getResult(enteredContent);
            setPosts([...posts, {['email']: email, ['content']: enteredContent, ['sentiment']: sentiment }])
            setEnteredContent("")
            console.log(posts);
        }
        else
            alert("Enter something to add a post")
    }


    const handleLogout = async () => {
        localStorage.setItem("email", "");
        router.push('/')
    }
  return (
    <div className="w-full  px-40 flex flex-col items-start bg-[#C8C8BE] py-20 h-full">
        <h1 className='w-full text-center text-8xl my-10 font-semibold'>Timeline</h1>

        {
            posts.map((item)=> (
                <div className='flex my-5 items-center'>
                    <img alt={"ProfilePicture"} src='../../../public/capture.png' {...(item.email === "test1@gmail.com" ? {src: 'https://alqlspfwemlbqdmocscp.supabase.co/storage/v1/object/public/HaadiAppBucket/UserProfilePicture/capture.png'} : {src: 'https://alqlspfwemlbqdmocscp.supabase.co/storage/v1/object/public/HaadiAppBucket/UserProfilePicture/capture1.png?t=2024-05-07T18%3A40%3A20.296Z'})}  width={200} className='w-32 mx-20 h-32 rounded-full'/>
                    <div className='flex  flex-col'>
                        <p className='text-sm font-bold'>{item.email==="test1@gmail.com" ? "Angela" : "Emmanuel"}</p>
                        <p className='my-3'>{item.content}</p>
                        <p className='font-semibold'>{item.sentiment}</p>
                    </div>
                </div>
            ))
        }

        <div className='flex flex-col w-full items-center justify-center'>
            <input type="text" placeholder="Enter Content" value={enteredContent} onChange={(e)=>{setEnteredContent(e.target.value)}} className="border-2 my-2 border-gray-600 rounded-xl p-2" />

            <input type="button" value="Add a Post" onClick={handleAddPost} className="bg-white rounded-full my-2 p-3 hover:cursor-pointer px-10" />
            <input type="button" value="Logout" onClick={handleLogout} className="bg-white rounded-full p-3 my-2 hover:cursor-pointer px-10" />
        </div>

    </div>
  )
}

export default page
