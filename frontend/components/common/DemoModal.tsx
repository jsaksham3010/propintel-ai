"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DemoModal({
  open,
  onOpenChange,
}: DemoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>🎥 PropIntel AI Demo</DialogTitle>
        </DialogHeader>

        <div className="aspect-video overflow-hidden rounded-xl border">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="PropIntel AI Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}