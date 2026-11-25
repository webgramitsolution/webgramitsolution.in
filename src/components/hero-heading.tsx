type HeadingContent =
  { title: string; lines?: never } | { lines: readonly [string, string]; title?: never };

function textWidth(text: string) {
  return [...text].reduce((width, char) => {
    if (/[ ilI.,:;'!|]/.test(char)) return width + 0.34;
    if (/[MWmw@%&]/.test(char)) return width + 0.93;
    if (/[A-Z]/.test(char)) return width + 0.73;
    return width + 0.6;
  }, 0);
}

function splitTitle(title: string): [string, string] {
  const words = title.trim().split(/\s+/);
  let lines: [string, string] = [title, ""];
  let width = Infinity;
  for (let index = 1; index < words.length; index++) {
    const first = words.slice(0, index).join(" ");
    const second = words.slice(index).join(" ");
    const candidate = Math.max(textWidth(first), textWidth(second));
    if (candidate < width) {
      lines = [first, second];
      width = candidate;
    }
  }
  return lines;
}

export function HeroHeading({
  id,
  className,
  title,
  lines,
  accent,
}: HeadingContent & { id?: string; className: string; accent?: string }) {
  const [first, second] = lines ?? splitTitle(title);
  const limit = 100 / (Math.max(textWidth(first), textWidth(second)) * 1.04 || 1);

  return (
    <h1 id={id} className={className} style={{ containerType: "inline-size" }}>
      <span className="block whitespace-nowrap" style={{ fontSize: `min(1em, ${limit}cqi)` }}>
        <span className="block">{first}</span>{" "}
        {second && <span className={`block ${accent ?? ""}`}>{second}</span>}
      </span>
    </h1>
  );
}
