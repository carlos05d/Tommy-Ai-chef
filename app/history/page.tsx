"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type HistoryItem = {
  id: string
  query: string
  response: string
  timestamp: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    // Check if user is logged in (for demo purposes)
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/signup")
      return
    }

    // Load chat history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]")
    setHistory(savedHistory)
  }, [router])

  const handleClearHistory = () => {
    localStorage.setItem("chatHistory", "[]")
    setHistory([])
  }

  const handleDeleteItem = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id)
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory))
    setHistory(updatedHistory)
  }

  const handleViewItem = (query: string) => {
    // Navigate to chat with the query pre-filled
    router.push(`/chat?query=${encodeURIComponent(query)}`)
  }

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <div className="min-h-screen bg-orange-50 pb-20">
      <div className="container mx-auto p-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-orange-800">Chat History</h1>
          {history.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearHistory}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Clear All
            </Button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="mt-10 text-center text-gray-500">
            <p>No chat history yet</p>
            <p className="mt-2 text-sm">Your conversations with Tommy will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="cursor-pointer p-4 hover:bg-orange-100" onClick={() => handleViewItem(item.query)}>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-orange-800">{item.query}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteItem(item.id)
                        }}
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.response}</p>
                    <p className="mt-2 text-xs text-gray-400">
                      {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Navbar />
    </div>
  )
}
