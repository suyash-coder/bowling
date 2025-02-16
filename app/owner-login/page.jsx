"use client"

import { useState } from "react"
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
    const ownerEmail = "vbsuyash10@gmail.com"
    if (email === ownerEmail) {
      router.push("/owner-dashboard")
    } else {
        alert("Email not registered as owner")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/bg.png')] bg-cover">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm p-10 bg-orange-400 flex flex-col rounded-3xl bg-opacity-90">
        <h1 className="text-4xl text-orange-950 font-bold text-center">Owner Login</h1>
        <div className="space-y-2 " >
          <Label htmlFor="email">Email</Label>
          <Input className=" bg-orange-200" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            className=" bg-orange-200"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-orange-950 text-white hover:text-black hover:bg-orange-700">
          Login
        </Button>
      </form>
    </div>
  )
}

