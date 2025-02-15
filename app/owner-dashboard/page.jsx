"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Booking Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="mb-4 p-4 border rounded">
                    <p>
                      <strong>{request.customerName}</strong>
                    </p>
                    <p>Date: {request.date}</p>
                    <p>Time: {request.time}</p>
                    <p>Lane: {request.laneNumber}</p>
                    <p>Players: {request.playerCount}</p>
                    <div className="mt-2 space-x-2">
                      <Button onClick={() => handleRequestAction(request.id, "accept")} variant="default">
                        Accept
                      </Button>
                      <Button onClick={() => handleRequestAction(request.id, "decline")} variant="destructive">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confirmed">
          <Card>
            <CardHeader>
              <CardTitle>Confirmed Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {confirmedBookings.map((booking) => (
                  <div key={booking.id} className="mb-4 p-4 border rounded">
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

