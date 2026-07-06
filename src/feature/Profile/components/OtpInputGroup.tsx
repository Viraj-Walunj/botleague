import { useRef, useState, useEffect } from "react";

interface OtpInputGroupProps {
  length?: number;
  onVerify?: (code: string) => void;
  onExpire?: () => void;
  seconds?: number;
}

export default function OtpInputGroup({
  length = 4,
  onVerify,
  onExpire,
  seconds = 20,
}: OtpInputGroupProps) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const [timeLeft, setTimeLeft] = useState(seconds);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, onExpire]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const mm = String(Math.floor(Math.max(timeLeft, 0) / 60)).padStart(2, "0");
  const ss = String(Math.max(timeLeft, 0) % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-10">
      {/* <div className="flex flex-col items-center gap-1.5"> */}
        <div className="flex gap-5">
          {digits.map((d, i) => {
            const inputElement = (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className=" h-[55px] w-[55px] rounded-[8px] border border-[#BDBDBD] bg-[#DDDDDD]/[0.87] text-center text-[25px] font-semibold  text-[#282828]/84 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] outline-none transition focus:border-blue-500 focus:bg-white"
            />
          );
          
          if (i === 3) {
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              {inputElement}
              <span className="font-['Inter'] text-[21px] font-medium leading-[16px] tracking-[0px] text-[#8C6CFF] pt-1">
                {mm}:{ss}
              </span>
            </div>
          );
        }

        return inputElement;
      })}
    </div>

      <button
        type="button"
        onClick={() => onVerify?.(digits.join(""))}
        disabled={digits.some((d) => !d)}
        className="pl-2 pb-4 text-21px whitespace-nowrap text-lg font-medium text-[#0162D1] transition hover:brightness-125 disabled:opacity-100"
      >
        Verify OTP
      </button>
    </div>
  );
}
