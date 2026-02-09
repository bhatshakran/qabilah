const ConnectingLine = ({ totalLevels }: { totalLevels: number }) => {
  // We generate the points for the SVG path using the same math as the markers
  const points = Array.from({ length: totalLevels }, (_, i) => {
    const x = 200 + Math.sin(i * 1.5) * 80; // 200 is the center of our 400px wide SVG
    const y = i * 112 + 40; // 112 is the gap (gap-12 + marker height), 40 is half marker height
    return `${x},${y}`;
  }).join(' L ');

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 1200" // Adjust height based on (totalLevels * 112)
      preserveAspectRatio="none"
    >
      <path
        d={`M ${points}`}
        fill="transparent"
        stroke="rgba(245, 158, 11, 0.2)" // Amber color with low opacity
        strokeWidth="4"
        strokeDasharray="12, 12" // This creates the "dashed" effect
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ConnectingLine;
