import type { RefObject } from 'react';
import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash-es';

export function useDebouncedResize(
  targetRef: RefObject<HTMLElement | null>,
  onResize: () => void,
  wait = 150
) {
  const handler = useMemo(() => debounce(onResize, wait), [onResize, wait]);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    // 初次触发一次，确保首次渲染 autoFit 生效
    handler();

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        handler.cancel();
      };
    }

    const ro = new ResizeObserver(() => handler());
    ro.observe(el);

    return () => {
      ro.disconnect();
      handler.cancel();
    };
  }, [handler, targetRef]);
}

