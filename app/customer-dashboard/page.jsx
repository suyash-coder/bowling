"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"


export default function CustomerDashboard() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [availableDates, setAvailableDates] = useState([])
  const [availableTimes] = useState([
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ])
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [customerName, setCustomerName] = useState("")
  const [playerCount, setPlayerCount] = useState(1)
  const [phonenumber, setphonenumber] = useState()



  useEffect(() => {
    // Generate available dates (7 days from today)
    const dates = []
    for (let i = 1; i <= 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    setAvailableDates(dates)
  }, [])

  const handleSearch = () => {
    // In a real application, this would be an API call
    // For this example, we'll use mock data
    const mockSlots = [
      { id: 1, laneNumber: 1, price: 20 },
      { id: 2, laneNumber: 2, price: 20 },
      { id: 3, laneNumber: 3, price: 25 },
      { id: 4, laneNumber: 4, price: 25 },
    ]
    setAvailableSlots(mockSlots)
  }

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
  }

  const handleProceedToPayment = () => {
    // Here you would typically handle the booking request
    // For this example, we'll just log the booking details
    console.log({
      date,
      time,
      slot: selectedSlot,
      customerName,
      playerCount,
      phonenumber,
    })
    alert("Booking request sent to owner!")
  }

  return (
    <main className="p-8 bg-[url('/bg1.png')] bg-cover bg-fixed min-h-screen">
       <div className="flex  justify-end">
      <h1 className="text-5xl text-orange-400 mr-44 font-bold flex p-5 rounded-3xl bg-orange-950 bg-opacity-75 mb-4">
        Customer Dashboard
        </h1>
        <Image  
        src='ball.png'
        alt="Ball"
        height={100}
        width={100}
        className="ml-96 bg-orange-200 bg-opacity-75 rounded-3xl mb-4"
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-orange-400">
          <CardHeader>
            <CardTitle className="font-extrabold text-orange-800">Select Date and Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Select onValueChange={setDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch} className="w-full bg-orange-950 text-white hover:text-black hover:bg-orange-700">Search Available Slots</Button>
          </CardContent>
        </Card>
        {availableSlots.length > 0 && (
          <Card className="bg-orange-900">
            <CardHeader>
              <CardTitle className="font-extrabold text-orange-400">Available Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {availableSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-4 mb-2 rounded cursor-pointer bg-orange-200 text-orange-950 ${selectedSlot?.id === slot.id ? "bg-primary text-primary-foreground" : ""}`}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    <p>Lane {slot.laneNumber}</p>
                    <p>Price: ${slot.price}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
      {selectedSlot && (
        <Card className="mt-8 bg-orange-200">
          <CardHeader>
            <CardTitle className="font-extrabold text-orange-950">Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Your Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playerCount">Number of Players (max 4)</Label>
              <Input
                id="playerCount"
                type="number"
                min="1"
                max="4"
                value={playerCount}
                onChange={(e) => setPlayerCount(Number.parseInt(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phonenummber">Phone Number</Label>
              <Input
                id="phonenumber"
                type="number"
                min="1000000000"
                max="9999999999"
                value={phonenumber}
                onChange={(e) => setphonenumber(Number.parseInt(e.target.value))}
                required
              />
            </div>
            <Button onClick={handleProceedToPayment} className=" bg-orange-950 text-white hover:text-black hover:bg-orange-700">Send Booking Request</Button>
          </CardContent>
        </Card>
      )}
   
    </main>
    
  )
}

