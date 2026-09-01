// Shared star-rating display - used by both the Reviews page's gallery and
// the Home page's Patient Stories cards, since both render real reviews
// (see lib/cms/queries.ts's reviewRefs resolution) and should show the
// same rating the same way.
export default function Stars({ count }: { count: number }) {
  const full = Math.floor(count);
  const half = count % 1 !== 0;
  return (
    <div className="flex text-tertiary-container">
      {Array.from({ length: full }).map((_, i) => (
        <span
          key={`full-${i}`}
          className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
      {half && (
        <span
          className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star_half
        </span>
      )}
    </div>
  );
}
