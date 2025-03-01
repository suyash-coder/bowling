"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function OwnerDashboard() {
  const [pendingRequests, setPendingRequests] = useState([])
  const [confirmedBookings, setConfirmedBookings] = useState([])

  useEffect(() => {
    // Fetch pending requests and confirmed bookings from an API
    // This is a mock implementation
    const mockPendingRequests = [
      { id: 1, customerName: "John Doe", date: "2023-06-01", time: "14:00", laneNumber: 2, playerCount: 3 },
      { id: 2, customerName: "Jane Smith", date: "2023-06-01", time: "16:00", laneNumber: 1, playerCount: 4 },
      { id: 3, customerName: "Bob Johnson", date: "2023-06-02", time: "15:00", laneNumber: 3, playerCount: 2 },
    ]
    setPendingRequests(mockPendingRequests)

    const mockConfirmedBookings = [
      { id: 4, customerName: "Alice Brown", date: "2023-06-03", time: "18:00", laneNumber: 4, playerCount: 2 },
      { id: 5, customerName: "Charlie Davis", date: "2023-06-04", time: "19:00", laneNumber: 1, playerCount: 3 },
    ]
    setConfirmedBookings(mockConfirmedBookings)
  }, [])

  const handleRequestAction = (id, action) => {
    // In a real application, this would be an API call
    // For this example, we'll just update the local state
    const request = pendingRequests.find((req) => req.id === id)
    if (request) {
      if (action === "accept") {
        setConfirmedBookings([...confirmedBookings, request])
      }
      setPendingRequests(pendingRequests.filter((req) => req.id !== id))
    }
  }

  return (
    <div className="p-8 bg-[url('/bg1.png')] bg-cover bg-fixed">
      <div className="flex justify-between">
         <h1 className="text-6xl font-extrabold bg-orange-950 bg-opacity-85 text-orange-400 p-6 rounded-3xl  mb-4">Owner Dashboard</h1>
        <Image  
              src='ball.png'
              alt="Ball"
              height={100}
              width={100}
              className="ml-96 bg-orange-200 bg-opacity-75 rounded-3xl mb-4"
            />
      </div>
     
      <Tabs defaultValue="pending" >
        <TabsList className="bg-orange-200 ">
          <TabsTrigger value="pending" className="hover:bg-orange-950 hover:text-orange-400 active:bg-orange-600 active:text-black" >Pending Requests</TabsTrigger>
          <TabsTrigger value="confirmed" className="hover:bg-orange-950 hover:text-orange-400 active:bg-orange-600 active:text-black ">Confirmed Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Card className="bg-orange-700">
            <CardHeader>
              <CardTitle className="text-orange-950 font-extrabold text-3xl">Pending Booking Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="mb-4 p-4 border rounded text-orange-300 bg-orange-950">
                    <p>
                      <strong>{request.customerName}</strong>
                    </p>
                    <p>Date: {request.date}</p>
                    <p>Time: {request.time}</p>
                    <p>Lane: {request.laneNumber}</p>
                    <p>Players: {request.playerCount}</p>
                    <div className="mt-2 space-x-2">
                      <Button onClick={() => handleRequestAction(request.id, "accept")} variant="default"  className="bg-orange-300 text-black hover:text-orange-200">
                        Accept
                      </Button>
                      <Button onClick={() => handleRequestAction(request.id, "decline")} variant="destructive" className="hover:bg-black hover:text-orange-200">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confirmed" >
          <Card className="bg-orange-700">
            <CardHeader>
              <CardTitle className="text-orange-950 font-extrabold text-3xl">Confirmed Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {confirmedBookings.map((booking) => (
                  <div key={booking.id} className="mb-4 p-4 border rounded  text-orange-300 bg-orange-950">
                    <p>
                      <strong>{booking.customerName}</strong>
                    </p>
                    <p>Date: {booking.date}</p>
                    <p>Time: {booking.time}</p>
                    <p>Lane: {booking.laneNumber}</p>
                    <p>Players: {booking.playerCount}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

