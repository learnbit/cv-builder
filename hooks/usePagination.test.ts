import { paginateBlocks } from "./usePagination";

type TestBlock = {
  id: string;
  keepWithNext?: boolean;
};

describe("paginateBlocks", () => {
  it("keeps a section title, experience header, and first description together", () => {
    const blocks: TestBlock[] = [
      { id: "previous" },
      { id: "title", keepWithNext: true },
      { id: "header", keepWithNext: true },
      { id: "first-description" },
      { id: "second-description" },
    ];

    const pages = paginateBlocks(blocks, [70, 10, 10, 20, 20], 100);

    expect(pages.map((page) => page.map((block) => block.id))).toEqual([
      ["previous"],
      ["title", "header", "first-description", "second-description"],
    ]);
  });

  it("allows later experience description blocks to continue on another page", () => {
    const blocks: TestBlock[] = [
      { id: "header", keepWithNext: true },
      { id: "first-description" },
      { id: "second-description" },
    ];

    const pages = paginateBlocks(blocks, [30, 50, 40], 100);

    expect(pages.map((page) => page.map((block) => block.id))).toEqual([
      ["header", "first-description"],
      ["second-description"],
    ]);
  });

  it("terminates when a keep-with-next group is taller than a page", () => {
    const blocks: TestBlock[] = [
      { id: "header", keepWithNext: true },
      { id: "large-description" },
      { id: "following" },
    ];

    const pages = paginateBlocks(blocks, [30, 120, 20], 100);

    expect(pages.flat().map((block) => block.id)).toEqual([
      "header",
      "large-description",
      "following",
    ]);
  });
});
