export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="text-xl font-bold">
          Prop<span className="text-blue-600">Intel</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Features
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Pricing
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </nav>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </header>
  );
}