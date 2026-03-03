interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-antique-gold"
      >
        {/* Outer heart outline */}
        <path
          d="M16 28.5C16 28.5 4.5 21 4.5 12.5C4.5 9.5 6 6.5 9.5 6C12 5.7 14 7 16 9.5C18 7 20 5.7 22.5 6C26 6.5 27.5 9.5 27.5 12.5C27.5 21 16 28.5 16 28.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Inner decorative star */}
        <path
          d="M16 12L16.5 13.5L18 14L16.5 14.5L16 16L15.5 14.5L14 14L15.5 13.5L16 12Z"
          fill="currentColor"
        />

        {/* Small accent dots */}
        <circle cx="12" cy="13" r="0.8" fill="currentColor" opacity="0.6" />
        <circle cx="20" cy="13" r="0.8" fill="currentColor" opacity="0.6" />
        <circle cx="16" cy="18.5" r="0.8" fill="currentColor" opacity="0.6" />
      </svg>

      {/* Text */}
      {showText && (
        <span className="font-serif text-warm-ivory text-lg tracking-wider">
          Sirius
        </span>
      )}
    </div>
  );
}
