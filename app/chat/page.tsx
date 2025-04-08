"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ChatMessage } from "@/components/chat-message"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send, ImageIcon } from "lucide-react"
import { generateRecipe } from "@/lib/api"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    // Check if user is logged in (for demo purposes)
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/signup")
    }

    // Add welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "👨‍🍳 Hi! I'm Tommy, your AI Chef powered by Google Gemini. Tell me what ingredients you have, and I'll suggest some delicious recipes you can make!",
        },
      ])
    }
  }, [messages.length, router])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await generateRecipe(input)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Save to history (in a real app, this would go to a database)
      const history = JSON.parse(localStorage.getItem("chatHistory") || "[]")
      localStorage.setItem(
        "chatHistory",
        JSON.stringify([
          ...history,
          {
            id: Date.now().toString(),
            query: input,
            response: response,
            timestamp: new Date().toISOString(),
          },
        ]),
      )
    } catch (error) {
      console.error("Error in chat submission:", error)

      // Extract the error message
      let errorMessage = "Sorry, I couldn't generate a recipe right now. Please try again later."
      if (error instanceof Error) {
        errorMessage = `Sorry, there was a problem: ${error.message}`
      }

      const assistantErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorMessage,
      }

      setMessages((prev) => [...prev, assistantErrorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, you would upload this image and use OCR to extract ingredients
    // For demo purposes, we'll just use a placeholder message
    setInput("I uploaded an image with tomatoes, mozzarella, and basil")
  }

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <div className="flex min-h-screen flex-col bg-orange-50">
      <div className="sticky top-0 z-10 flex items-center border-b bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">👨‍🍳</div>
          <div className="ml-3">
            <h2 className="font-medium">Tommy AI Chef</h2>
            <p className="text-xs text-gray-500">Your cooking assistant</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-16 border-t bg-white p-4 shadow-lg">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200">
              <ImageIcon className="h-5 w-5" />
            </div>
            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What ingredients do you have?"
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>

      <Navbar />
    </div>
  )
}
