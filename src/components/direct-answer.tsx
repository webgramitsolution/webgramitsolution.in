/** Short, extractable definition block placed under a question-style H2 for answer engines. */
export function DirectAnswer({ id, question, answer }: { id: string; question: string; answer: string }) {
  return (
    <section aria-labelledby={id} className="bg-card py-6">
      <div className="ecom-shell">
        <div className="rounded-lg border border-primary/20 bg-primary-soft/40 p-4 md:p-5">
          <h2 id={id} className="text-[20px] font-medium leading-[1.3] text-navy md:text-[24px]">
            {question}
          </h2>
          <p className="mt-2 max-w-[900px] text-[15px] leading-[1.6] text-foreground md:text-[16px]">{answer}</p>
        </div>
      </div>
    </section>
  );
}

export type ComparisonRow = { feature: string; a: string; b: string; best: string };

export function ComparisonTable({
  id,
  title,
  intro,
  columns,
  rows,
}: {
  id: string;
  title: string;
  intro: string;
  columns: [string, string, string, string];
  rows: ComparisonRow[];
}) {
  return (
    <section aria-labelledby={id} className="bg-card py-6">
      <div className="ecom-shell">
        <h2 id={id} className="text-[20px] font-medium leading-[1.3] text-navy md:text-[26px]">
          {title}
        </h2>
        <p className="mt-2 max-w-[860px] text-[15px] leading-[1.6] text-muted-foreground md:text-[16px]">{intro}</p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] border-collapse text-left text-[14px] md:text-[15px]">
            <caption className="sr-only">{title}</caption>
            <thead className="bg-sky-soft text-navy">
              <tr>
                {columns.map((c) => (
                  <th key={c} scope="col" className="px-3 py-3 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-t border-border align-top">
                  <th scope="row" className="px-3 py-3 font-medium text-navy">
                    {r.feature}
                  </th>
                  <td className="px-3 py-3 leading-[1.5] text-muted-foreground">{r.a}</td>
                  <td className="px-3 py-3 leading-[1.5] text-muted-foreground">{r.b}</td>
                  <td className="px-3 py-3 leading-[1.5] text-foreground">{r.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
