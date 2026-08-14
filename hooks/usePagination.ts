import { MAX_PAGE_CONTENT_HEIGHT } from "@/constants/page";
import { useLayoutEffect, useRef, useState } from "react";

type BlockWithKeep = {
  keepWithNext?: boolean;
};

export default function usePagination<T extends BlockWithKeep>(blocks: T[]) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<T[][]>([]);
  const pagesRef = useRef<T[][]>([]);

  useLayoutEffect(() => {
    const measureContainer = measureRef.current;
    if (!measureContainer) return;

    const invisibleChildren = Array.from(
      measureContainer.children
    ) as HTMLElement[];

    if (!invisibleChildren.length) return;

    const newPages = paginateBlocks(
      blocks,
      invisibleChildren.map((child) => child.offsetHeight)
    );

    if (!isSamePages(pagesRef.current, newPages)) {
      pagesRef.current = newPages;
      setPages(newPages);
    }
  }, [blocks]);

  return {
    measureRef,
    pages,
  };
}

export function paginateBlocks<T extends BlockWithKeep>(
  blocks: T[],
  heights: number[],
  maxPageHeight = MAX_PAGE_CONTENT_HEIGHT
) {
  const newPages: T[][] = [];
  let page: T[] = [];
  let height = 0;

  for (let i = 0; i < blocks.length; i++) {
    const blockHeight = heights[i] ?? 0;

    if (blocks[i]?.keepWithNext && i + 1 < blocks.length) {
      let keepGroupEnd = i;
      while (
        keepGroupEnd + 1 < blocks.length &&
        blocks[keepGroupEnd]?.keepWithNext
      ) {
        keepGroupEnd++;
      }

      const keepGroupHeight = heights
        .slice(i, keepGroupEnd + 1)
        .reduce((total, itemHeight) => total + itemHeight, 0);

      if (
        height + keepGroupHeight > maxPageHeight &&
        keepGroupHeight <= maxPageHeight &&
        page.length > 0
      ) {
        newPages.push(page);
        page = [];
        height = 0;
      }
    }

    if (height + blockHeight > maxPageHeight && page.length > 0) {
      newPages.push(page);
      page = [];
      height = 0;
    }

    page.push(blocks[i]);
    height += blockHeight;
  }

  if (page.length) newPages.push(page);

  return newPages;
}

function isSamePages<T>(a: T[][], b: T[][]) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false;

    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }

  return true;
}
