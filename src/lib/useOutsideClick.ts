import { useEffect, type RefObject } from 'react'

export function useOutsideClick(ref: RefObject<HTMLElement | null>, onOutsideClick: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return

    function handlePointerDown(event: PointerEvent) {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        onOutsideClick()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [ref, onOutsideClick, active])
}
