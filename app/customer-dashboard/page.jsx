"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

export default function CustomerDashboard() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes] = useState([
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
  ]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [playerCount, setPlayerCount] = useState(1);
  const [phonenumber, setPhonenumber] = useState("");
  const [userId, setUserId] = useState("");

  // Retrieve user ID from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);  // Ensure it's set
    } else {
      console.warn("User ID not found in localStorage");
    }
  }, []);

  useEffect(() => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    setAvailableDates(dates);
  }, []);

  const handleSearch = async () => {
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    try {
      const response = await fetch("https://bowling-alley.onrender.com/api/bookings/available-tracks");
      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data);
      } else {
        alert("Failed to fetch available slots.");
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleProceedToPayment = async () => {
    console.log("Booking Data Check:", { userId, date, time, selectedSlot, customerName });

    if (!userId || !date || !time || !selectedSlot || !customerName) {
      alert("Please fill all details before proceeding.");
      return;
    }

    const bookingData = {
      userId: userId.toString(),
      trackNumber: selectedSlot.laneNumber,
      startTime: `${date}T${time}:00Z`,
      endTime: `${date}T${parseInt(time) + 2}:00Z`,
    };

    try {
      const response = await fetch("https://bowling-alley.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("Booking request sent successfully!");
        window.location.href = "/payment";  // Redirect to payment page
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="p-8 bg-[url('/bg.png')] bg-cover bg-fixed min-h-screen">
      <div className="flex justify-end">
        <h1 className="text-5xl text-orange-400 mr-44 font-bold flex p-5 rounded-3xl bg-orange-950 bg-opacity-75 mb-4">
          Customer Dashboard
        </h1>
        <Image src='ball.png' alt="Ball" height={100} width={100} className="ml-96 bg-orange-200 bg-opacity-75 rounded-3xl mb-4" />
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
            <Button onClick={handleSearch} className="w-full bg-orange-950 text-white hover:text-black hover:bg-orange-700">
              Search Available Slots
            </Button>
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
                  <div key={slot.id} className={`p-4 mb-2 rounded cursor-pointer bg-orange-200 text-orange-950 ${selectedSlot?.id === slot.id ? "bg-primary text-primary-foreground" : ""}`} onClick={() => handleSlotSelect(slot)}>
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
              <Label htmlFor="userId">Your Username</Label>
              <Input id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </div>
            <Button onClick={handleProceedToPayment} className="bg-orange-950 text-white hover:text-black hover:bg-orange-700">
              Send Booking Request
            </Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}