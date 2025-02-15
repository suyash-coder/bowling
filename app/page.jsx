import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ball from "../public/ball.png"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/bg.png')] bg-cover justify-center p-20">
      <div className="relative flex flex-col mt-40 items-center justify-center px-96">
      <div className="absolute px-10 pt-10 bg-orange-400 flex flex-col rounded-3xl bg-opacity-90 justify-center items-center ">
     
      <h1 className="text-6xl text- font-bold text-orange-900 mb-2">WELCOME</h1>
      <h1 className="text-orange-900">TO</h1>
      <h1 className="text-7xl text-center text-orange-900 font-bold ">XYZ </h1>
      <h1 className="text-5xl text-center text-orange-900 font-bold  mb-8 ">BOWLING ALLEY </h1>

    </div> 
    <Image  
        src={ball}
        alt="Ball"
        height={130}
        width={130}
        className=" absolute ml-96 mb-72"
      />
  
      </div>
      <div className="bg-orange-900 p-3 rounded-xl mt-36 gap-10 flex justify-center">
        <Button asChild className="px-6 bg-orange-300 text-black hover:text-white">
          <Link href="/customer-login">Login</Link>
        </Button>
        <Button asChild className="px-2 bg-orange-300 text-black hover:text-white">
          <Link href="/owner-login">Login as owner</Link>
        </Button>
        <Button asChild className="px-6 bg-orange-300 text-black hover:text-white">
          <Link href="/register">Sign Up</Link>
        </Button>
      </div>
    </main>
  )
}

