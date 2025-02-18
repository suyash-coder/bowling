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

  
  const handleLogin = async (email,password)=>{

    try{
      const response = await
    fetch("https://bowling-alley.onrender.com/api/users/login",{ 
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email,password}),
    });

    const data = await response.json();
    if(response.ok){
      localStorage.setItem("userId",data.userId);

      alert("Login successful!");
    }else{
      alert(`Login Failed:${data.message}`);
    }

  } catch(error){
    console.error("Error logging in :",error);
    alert("Something went wrong. Please try again.");
  }
}
const handleSubmit = async (e) => {
  e.preventDefault();

  await handleLogin(email,password);

  // Here you would typically handle the login logic
  // For this example, we'll use a hardcoded owner email
  router.push("/customer-dashboard")
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/bg.png')] bg-cover">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm p-10 bg-orange-400 flex flex-col rounded-3xl bg-opacity-90">
        <h1 className="text-4xl text-orange-950 font-bold text-center">Login</h1>
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

