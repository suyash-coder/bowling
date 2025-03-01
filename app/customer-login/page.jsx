"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    // For this example, we'll use a hardcoded owner email
    router.push("/customer-dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/bg1.png')] bg-cover">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm p-10 bg-orange-400 flex flex-col rounded-3xl bg-opacity-90">
        <h1 className="text-4xl text-orange-950 font-bold text-center">Login</h1>
        <div className="space-y-2 " >
          <Label htmlFor="email">Email</Label>
          <Input className=" bg-orange-200" id="email" type="email" value={email} placeholder="Enter username or email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            className=" bg-orange-200"
            id="password"
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <h1 className="text-center ">
            <Link href='/' className="text-xs text-red-800">Forgot password?</Link>
        </h1>
        </div>
        
        <Button type="submit" className="w-full bg-orange-950 text-white hover:text-black hover:bg-orange-700">
          Login
        </Button>

        <h1 className="space-y-2 ml-5 text-sm">
           Dont have an account? 
           <Link href='/register' className="text-sm text-red-800">  Create account </Link>
        </h1>
      </form>
    </div>
  )
}

