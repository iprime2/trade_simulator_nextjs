"use client"

import { ModeToggle } from "./ModeToggle"


export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 shadow bg-background border-b">
      <h1 className="text-xl font-bold">GoQuant Trade Simulator</h1>
      <ModeToggle />
    </header>
  )
}
