export default function SVGRaw({ d, strokeWith, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'w-6 h-6'}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWith || 2}
        d={d}
      />
    </svg>
  );
}
