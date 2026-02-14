"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import PricingSection from "./PricingSection";

function PricingModal({ subTier = "free", children }) {
  const [isOpen, setIsOpen] = useState(false);
  const canOpen = subTier === "free";

  const handleOpenChange = (open) => {
    if (!canOpen) return; // block opening
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <span
          style={{
            cursor: canOpen ? "pointer" : "not-allowed",
            opacity: canOpen ? 1 : 0.6,
          }}
        >
          {children}
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle />
        <PricingSection />
      </DialogContent>
    </Dialog>
  );
}

export default PricingModal;
