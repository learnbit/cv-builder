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

    const newPages: T[][] = [];
    let page: T[] = [];
    let height = 0;

    for (let i = 0; i < invisibleChildren.length; i++) {
      const blockHeight = invisibleChildren[i].offsetHeight;
      const block = blocks[i];

      // If block must stay with the next block (like section titles)
      if (block?.keepWithNext && i + 1 < invisibleChildren.length) {
        const nextHeight = invisibleChildren[i + 1].offsetHeight;

        if (
          height + blockHeight + nextHeight > MAX_PAGE_CONTENT_HEIGHT &&
          page.length > 0
        ) {
          newPages.push(page);
          page = [];
          height = 0;
        }
      } else {
        if (height + blockHeight > MAX_PAGE_CONTENT_HEIGHT && page.length > 0) {
          newPages.push(page);
          page = [];
          height = 0;
        }
      }

      page.push(block);
      height += blockHeight;
    }

    if (page.length) newPages.push(page);

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
