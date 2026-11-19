import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { projectsForLocation } from "./locations";

const items = [
  { name: "My Party Suppliers", location: "Gurgaon, India" },
  { name: "Adlite Electricals", location: "Faridabad, India" },
  { name: "Chaatewala", location: "Delhi, India" },
  { name: "Houskase", location: "Delhi NCR, India" },
  { name: "Regal", location: "Ontario, Canada" },
];

describe("location projects", () => {
  it("Gurugram page lists the Gurgaon project first, then other Delhi NCR projects", () => {
    const result = projectsForLocation("gurugram", items);
    assert.equal(result.local, true);
    assert.equal(result.items[0]?.name, "My Party Suppliers");
    assert.equal(result.items.length, 4);
    assert.ok(!result.items.some((i) => i.location.includes("Canada")));
  });
  it("Noida has no local project, so it shows Delhi NCR projects and never overseas ones", () => {
    const result = projectsForLocation("noida", items);
    assert.equal(result.local, false);
    assert.ok(!result.items.some((i) => i.location.includes("Canada")));
    assert.equal(result.items.length, 4);
  });
});
