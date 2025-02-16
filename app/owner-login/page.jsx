"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://bowling-alley.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store user data in localStorage
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login successful!");

      // Redirect based on user role
      if (data.role === "owner") {
        router.push("/owner-dashboard");
      } else {
        router.push("/customer-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
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

