import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">🏡 PropIntel AI</h1>

        <p className="mt-5 text-xl text-slate-400">
          Know Everything Before You Buy.
        </p>

        <Button className="mt-8">
          Get Started
        </Button>
      </div>
    </main>
  );
}