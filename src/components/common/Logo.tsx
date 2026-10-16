import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSlogan = true,
  showText = true,
  className = ''
}) => {
  const sizeMap = {
    sm: { icon: 34, title: 'text-lg', slogan: 'text-[9px]' },
    md: { icon: 46, title: 'text-2xl', slogan: 'text-[11px]' },
    lg: { icon: 68, title: 'text-3xl', slogan: 'text-xs' },
    xl: { icon: 96, title: 'text-4xl sm:text-5xl', slogan: 'text-xs sm:text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <div className="flex items-center gap-3">
        {/* Vector SVG emblem replicating EDVYNTRA logo */}
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-md"
        >
          <defs>
            <linearGradient id="edvGradientTop" x1="20" y1="20" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="50%" stopColor="#0072FF" />
              <stop offset="100%" stopColor="#0E1B4D" />
            </linearGradient>

            <linearGradient id="edvGradientRibbon" x1="60" y1="30" x2="130" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="60%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>

            <linearGradient id="edvGradientBookLeft" x1="40" y1="130" x2="100" y2="175" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00B4D8" />
              <stop offset="100%" stopColor="#00296B" />
            </linearGradient>

            <linearGradient id="edvGradientBookRight" x1="160" y1="130" x2="100" y2="175" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0096C7" />
              <stop offset="100%" stopColor="#001845" />
            </linearGradient>

            <linearGradient id="circuitGrad" x1="110" y1="60" x2="160" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#0066FF" />
            </linearGradient>
          </defs>

          {/* Book base - Open pages */}
          {/* Lower left page */}
          <path
            d="M99 155C70 148 45 155 35 159C34 149 39 133 50 128C70 135 90 145 99 155Z"
            fill="#0284C7"
          />
          {/* Main lower pages */}
          <path
            d="M99 164C65 145 35 152 28 155C26 142 35 125 55 122C74 135 90 148 99 164Z"
            fill="url(#edvGradientBookLeft)"
          />
          <path
            d="M101 164C135 145 165 152 172 155C174 142 165 125 145 122C126 135 110 148 101 164Z"
            fill="url(#edvGradientBookRight)"
          />
          <path
            d="M99 166C70 148 42 154 36 157L99 178L164 157C158 154 130 148 101 166Z"
            fill="#071952"
          />

          {/* The ribbon letter 'E' */}
          {/* Top arch folding into E */}
          <path
            d="M78 48C90 32 118 30 130 42C133 45 122 55 110 52C98 48 88 56 86 65L78 48Z"
            fill="#00D2FF"
          />
          {/* Main curved ribbon stem */}
          <path
            d="M86 42C74 52 64 74 65 98C66 116 75 133 90 140C104 147 122 138 128 128C132 121 124 116 118 120C110 126 95 126 88 116C82 106 82 85 91 66C98 52 112 44 126 48C134 50 138 42 134 38C120 26 98 28 86 42Z"
            fill="url(#edvGradientRibbon)"
          />

          {/* Central spine of the E */}
          <path
            d="M87 90C95 86 112 84 126 90C130 92 132 85 126 82C112 76 92 78 85 84L87 90Z"
            fill="#0091FF"
          />

          {/* Electronic Circuit Nodes branching from spine */}
          {/* Trace 1 (top node) */}
          <path
            d="M125 55L142 55L154 68L166 68"
            stroke="url(#circuitGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="166" cy="68" r="8" fill="#00C8FF" stroke="#0055D4" strokeWidth="2" />

          {/* Trace 2 (middle node) */}
          <path
            d="M128 86L142 86L155 96L172 96"
            stroke="url(#circuitGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="172" cy="96" r="8" fill="#0080FF" stroke="#0040A8" strokeWidth="2" />

          {/* Trace 3 (lower node) */}
          <path
            d="M118 122L136 122L150 134L162 134"
            stroke="url(#circuitGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="162" cy="134" r="7" fill="#0052CC" stroke="#002D7A" strokeWidth="2" />
        </svg>

        {showText && (
          <div className="flex flex-col">
            <span className={`font-black tracking-tight text-slate-900 leading-none ${currentSize.title}`}>
              EDVYNT<span className="text-blue-600">R</span>A
            </span>
            {showSlogan && (
              <span className={`font-bold tracking-[0.22em] text-slate-500 uppercase mt-1 flex items-center gap-1.5 ${currentSize.slogan}`}>
                <span>Aprende</span>
                <span className="text-cyan-500 font-extrabold">•</span>
                <span>Crea</span>
                <span className="text-cyan-500 font-extrabold">•</span>
                <span>Avanza</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
