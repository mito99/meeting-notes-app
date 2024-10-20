"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { FileAudio, FileText, Home } from 'lucide-react'

const Navbar = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'ホーム', icon: Home },
    { href: '/upload', label: 'アップロード', icon: FileAudio },
    { href: '/minutes', label: '議事録一覧', icon: FileText },
  ]

  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b">
      <Link href="/" className="text-2xl font-bold">
        議事録アプリ
      </Link>
      <div className="flex space-x-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? 'default' : 'ghost'}
            asChild
          >
            <Link href={item.href} className={cn(
              'flex items-center space-x-1',
              pathname === item.href ? 'text-primary-foreground' : 'text-foreground'
            )}>
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar