import { useRef, useCallback } from 'react';
import type { Size } from '../state/types';

interface UseResizableOptions {
  onResize: (size: Size) => void;
  minSize: Size;
  disabled?: boolean;
}

export function useResizable({ onResize, minSize, disabled }: UseResizableOptions) {
  const isResizing = useRef(false);
  const startSize = useRef({ width: 0, height: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isResizing.current) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      onResize({
        width: Math.max(minSize.width, startSize.current.width + dx),
        height: Math.max(minSize.height, startSize.current.height + dy),
      });
    });
  }, [onResize, minSize]);

  const handlePointerUp = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  }, [handlePointerMove]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return;
    e.stopPropagation();
    isResizing.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    const parent = (e.currentTarget as HTMLElement).parentElement!;
    startSize.current = { width: parent.offsetWidth, height: parent.offsetHeight };
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }, [disabled, handlePointerMove, handlePointerUp]);

  return { onPointerDown: handlePointerDown };
}
