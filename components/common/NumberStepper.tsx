"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 999,
}: NumberStepperProps) {
  function disminuir() {
    if (value > min) {
      onChange(value - 1);
    }
  }

  function aumentar() {
    if (value < max) {
      onChange(value + 1);
    }
  }

  return (
    <div className="flex items-center gap-2">

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={disminuir}
      >
        -
      </Button>

        <Input
        type="number"
        min={min}
        max={max}
        value={value}
        className="w-20 text-center"
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        />

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={aumentar}
      >
        +
      </Button>

    </div>
  );
}