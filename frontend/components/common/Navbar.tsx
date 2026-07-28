"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Prop<span className="text-blue-600">Intel</span>
          <span className="ml-1 text-sm font-medium text-muted-foreground">
            AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
          >
            How It Works
          </a>

          <a
            href="#vision"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
          >
            Vision
          </a>

          <a
            href="#why-us"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
          >
            Why Us
          </a>

          <a
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
          >
            FAQ
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
          >
            Contact
          </a>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-muted md:block"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}