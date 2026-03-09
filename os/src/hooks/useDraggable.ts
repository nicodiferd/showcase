import { useRef, useCallback } from 'react';
import type { Position } from '../state/types';

interface UseDraggableOptions {
  onDragStart?: () => void;
  onDrag: (position: Position) => void;
  onDragEnd?: () => void;
  disabled?: boolean;
}

export function useDraggable({ onDragStart, onDrag, onDragEnd, disabled }: UseDraggableOptions) {
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const taskbarHeight = 40;
      const x = Math.max(0, Math.min(e.clientX - startOffset.current.x, window.innerWidth - 100));
      const y = Math.max(0, Math.min(e.clientY - startOffset.current.y, window.innerHeight - taskbarHeight - 32));
      onDrag({ x, y });
    });
  }, [onDrag]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
    onDragEnd?.();
  }, [handlePointerMove, onDragEnd]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return;
    // Don't drag if clicking buttons
    if ((e.target as HTMLElement).closest('button')) return;

    isDragging.current = true;
    const rect = (e.currentTarget as HTMLElement).parentElement!.getBoundingClientRect();
    startPos.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    onDragStart?.();
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }, [disabled, onDragStart, handlePointerMove, handlePointerUp]);

  return { onPointerDown: handlePointerDown };
}
