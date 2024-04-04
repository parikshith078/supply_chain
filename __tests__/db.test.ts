import { testAdd } from "@/db/pocketbase";
import { expect, test } from "vitest";

test("adds 1 + 2 to equal 3", () => {
  expect(testAdd(1, 2)).toBe(3);
});
