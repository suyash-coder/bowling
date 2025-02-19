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
  const [username, setUsername] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    // For this example, we'll use a hardcoded owner email
    router.push("/")
    alert("Hurray!!! Account created")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/bg.png')] bg-cover">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm p-10 bg-orange-400 flex flex-col rounded-3xl bg-opacity-90">
        <h1 className="text-4xl text-orange-950 font-bold text-center">Sign Up</h1>
        <div className="space-y-2 ">
          <Label htmlFor="username">Username</Label>
          <Input className=" bg-orange-200" id="username" type="username" value={username} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="space-y-2 " >
          <Label htmlFor="email">Email</Label>
          <Input className=" bg-orange-200" id="email" type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            className=" bg-orange-200"
            id="password"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-orange-950 text-white hover:text-black hover:bg-orange-700">
          Create account
        </Button>

        <h1 className="space-y-2 ml-10 text-sm">
           Already have an account? 
           <Link href='/customer-login' className="text-sm text-red-800">  Login </Link>
        </h1>
      </form>
    </div>
  )
}

