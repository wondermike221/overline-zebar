export function Chip({ Icon, stat }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-text">
      {Icon} {/* Render Icon directly */}
      <p>{stat}</p>
    </div>
  );
}
