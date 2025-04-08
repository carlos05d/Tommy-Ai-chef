"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, History, User } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background shadow-lg">
      <div className="container mx-auto flex justify-around">
        <NavItem href="/dashboard" icon={<Home className="h-6 w-6" />} label="Home" isActive={isActive("/dashboard")} />
        <NavItem href="/chat" icon={<MessageSquare className="h-6 w-6" />} label="Chat" isActive={isActive("/chat")} />
        <NavItem
          href="/history"
          icon={<History className="h-6 w-6" />}
          label="History"
          isActive={isActive("/history")}
        />
        <NavItem href="/profile" icon={<User className="h-6 w-6" />} label="Profile" isActive={isActive("/profile")} />
      </div>
    </div>
  )
}

type NavItemProps = {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex flex-1 flex-col items-center py-3 ${
        isActive ? "text-orange-600" : "text-gray-500 hover:text-orange-600"
      }`}
    >
      {icon}
      <span className="mt-1 text-xs">{label}</span>
    </Link>
  )
}
