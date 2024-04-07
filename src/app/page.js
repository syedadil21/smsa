

export default function Home() {
  return (
    <>
    <div className="w-full  flex flex-col items-center bg-[#C8C8BE] h-[100vh] py-40">

      <h1 className="text-5xl font-bold">Social Media Sentiment Analysis</h1>
      <h2 className="text-2xl font-light">Get to know the intent of the user</h2>
      <div className=" flex flex-col my-2">
        <input type="text" placeholder="Email" className="border-2 my-2 border-gray-600 rounded-xl p-2" />
        <input type="text" placeholder="Password" className="border-2 my-2 border-gray-600 rounded-xl p-2" />
      </div>
      <input type="button" value="Login" className="bg-white rounded-full p-3 hover:cursor-pointer px-10" />
    </div>
    </>
  );
}
