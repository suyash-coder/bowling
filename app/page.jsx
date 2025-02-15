import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold justify-center mb-2">WELCOME</h1>
      <h1 className="justify-center mb-2">TO</h1>
      <h1 className="text-4xl text-center font-bold justify-center mb-8 ">XYZ BOWLING ALLEY</h1>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Sign Up</Link>
        </Button>
      </div>
    </main>
  )
}

