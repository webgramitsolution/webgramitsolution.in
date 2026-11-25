import { it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return path.includes("integrations") ? [] : sourceFiles(path);
    return /\.(tsx?|xml)$/.test(entry.name) &&
      !entry.name.endsWith(".test.ts") &&
      entry.name !== "routeTree.gen.ts"
      ? [path]
      : [];
  });
}

it("keeps share buttons without claiming sharing credits", () => {
  const source = readFileSync("src/components/blog-engagement.tsx", "utf8");
  assert.match(source, /window\.open\(platform\.url/);
  assert.doesNotMatch(
    source,
    /claim_share_bonus|claim_share_reward|claim_read_reward|record_share_click/,
  );
});

it("has no guest pages, guest sign-up or credit game left on the website", () => {
  assert.equal(
    readdirSync("src/routes").filter(
      (name) => name.startsWith("_guest") || name.startsWith("guest-login"),
    ).length,
    0,
  );
  assert.equal(existsSync("src/lib/game.functions.ts"), false);
  assert.equal(existsSync("src/lib/auth-email.functions.ts"), false);
});

it("never links visitors to the retired guest login", () => {
  const offenders = sourceFiles("src").filter((file) =>
    readFileSync(file, "utf8").includes("/guest-login"),
  );
  assert.deepEqual(offenders, []);
});
