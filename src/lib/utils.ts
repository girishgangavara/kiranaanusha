export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Remaining time to a target date, floored at zero. */
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function timeLeftUntil(target: Date, from: Date = new Date()): TimeLeft {
  const total = Math.max(0, target.getTime() - from.getTime());
  return {
    total,
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/** Deterministic pseudo-random in [0,1) so server and client render alike. */
export function seeded(index: number, salt = 1): number {
  const x = Math.sin((index + 1) * 9973 * salt) * 10_000;
  return x - Math.floor(x);
}
