"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { User, LogOut, Moon, Bell } from "lucide-react"

export default function ProfilePage() {
  const [email, setEmail] = useState("")
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
    // Check if user is logged in (for demo purposes)
    const userJson = localStorage.getItem("user")
    if (!userJson) {
      router.push("/signup")
      return
    }

    try {
      const user = JSON.parse(userJson)
      setEmail(user.email || "")
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/signup")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    })
    router.push("/")
  }

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <div className="min-h-screen bg-orange-50 pb-20">
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold text-orange-800">Profile</h1>

        <div className="mb-6 flex items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-200 text-orange-800">
            <User className="h-10 w-10" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{email}</h2>
            <p className="text-gray-500">Tommy AI Chef User</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your app preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-gray-500" />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch id="dark-mode" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <Label htmlFor="notifications">Notifications</Label>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              You are currently signed in as <span className="font-medium">{email}</span>
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={handleLogout} className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Navbar />
    </div>
  )
}
