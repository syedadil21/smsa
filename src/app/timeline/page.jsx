'use client'

import Image from 'next/image'
import img1 from '../../../public/capture.png'
import img2 from '../../../public/capture1.png'
import { useEffect } from 'react';
import axios from 'axios';

const page = () => {

    useEffect(() => {
      
        

        
    }, [])
    

    const getResult = async () => {

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
            text: `I hate myself`
          }
        };
        
        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

    }



  return (
    <div className="w-full p-10 px-40 flex flex-col items-start bg-[#C8C8BE] h-[100vh] py-40">
        <div className='flex my-5 items-center'>
            <Image alt={"ProfilePicture"} src={img2} width={200} objectFit='cover' className='w-32 mx-20 h-32 rounded-full'/>
            <div className='flex  flex-col'>
                <p className='text-sm font-bold' onClick={()=>{getResult();}}>Emmanuel</p>
                <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem nesciunt natus sint, odit adipisci suscipit rerum ullam obcaecati laudantium tempora. Non natus maxime voluptatem enim fugit. Minus minima dolorum fugit.</p>
                <p className='font-semibold'>Negative!</p>
            </div>
        </div>
        <div className='flex my-5 items-center'>
            <Image alt={"ProfilePicture"} src={img1} width={200} objectFit='cover' className='w-32 mx-20 h-32 rounded-full'/>
            <div className='flex  flex-col'>
                <p className='text-sm font-bold'>Angela</p>
                <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem nesciunt natus sint, odit adipisci suscipit rerum ullam obcaecati laudantium tempora. Non natus maxime voluptatem enim fugit. Minus minima dolorum fugit.</p>
                <p className='font-semibold'>Positive!</p>
            </div>
        </div>
    </div>
  )
}

export default page
