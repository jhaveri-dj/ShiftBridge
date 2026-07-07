export function MatchAnimation() {
  return (
    <svg
      width="168"
      height="56"
      viewBox="0 0 168 56"
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      <line
        x1="28"
        y1="28"
        x2="140"
        y2="28"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        className="landing-line"
      />
      <g className="landing-node landing-node-1">
        <circle cx="28" cy="28" r="9" fill="var(--primary)" />
      </g>
      <g className="landing-node landing-node-2">
        <circle cx="84" cy="28" r="9" fill="var(--highlight)" />
      </g>
      <g className="landing-node landing-node-3">
        <circle cx="140" cy="28" r="9" fill="var(--good)" />
      </g>
    </svg>
  );
}
