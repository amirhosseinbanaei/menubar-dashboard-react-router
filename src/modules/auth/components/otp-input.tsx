import { useEffect, useRef } from 'react';

interface OtpInputProps {
  value: string[];
  onChange: (otp: string[]) => void;
  length?: number;
}

export function OtpInput({ value, onChange, length = 4 }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return;

    const newOtp = [...value];
    newOtp[index] = digit;
    onChange(newOtp);

    // Move to next input if there's a value
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    const newOtp = [...value];

    pastedData.split('').forEach((char, index) => {
      if (index < length) newOtp[index] = char;
    });

    onChange(newOtp);
  };

  return (
    <div
      className='flex gap-2 items-center justify-center'
      dir='ltr'>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type='text'
          inputMode='numeric'
          maxLength={1}
          value={value[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className='w-12 h-12 text-center border rounded-md text-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none'
        />
      ))}
    </div>
  );
}
