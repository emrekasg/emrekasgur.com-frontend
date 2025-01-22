"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Header = () => {
  const pathname = usePathname()
  const { setTheme } = useTheme()

  return (
    <header className="w-full">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center space-y-4">
        <Link href="/" className="text-3xl font-serif tracking-wide hover:opacity-80 transition-opacity">
          Emre Kasgur
        </Link>
        <div className="flex items-center space-x-8">
          <nav className="flex items-center space-x-6 bg-black px-6 py-2">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/about" active={pathname === "/about"}>
              About me
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            English
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Turkish
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

const NavLink = ({ href, active, children }) => (
  <Link
    href={href}
    className={`text-sm font-medium transition-colors text-white hover:text-white/80`}
  >
    {children}
  </Link>
)

export default Header
