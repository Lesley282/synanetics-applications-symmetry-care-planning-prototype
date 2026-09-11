import { useCallback, useEffect, useRef, useState } from 'react'
import type { SaveStatus } from '../types/carePlan'

const IDLE_TO_SAVING_MS = 5000
const SAVING_DURATION_MS = 800
const SAVED_DURATION_MS = 2000

export function useAutosave() {
  const [dirty, setDirty] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const notifyChange = useCallback(() => {
    setDirty(true)
    setSaveStatus('idle')
    clearTimers()

    const toSaving = window.setTimeout(() => {
      setSaveStatus('saving')
      const toSaved = window.setTimeout(() => {
        setSaveStatus('saved')
        const toIdle = window.setTimeout(() => setSaveStatus('idle'), SAVED_DURATION_MS)
        timers.current.push(toIdle)
      }, SAVING_DURATION_MS)
      timers.current.push(toSaved)
    }, IDLE_TO_SAVING_MS)
    timers.current.push(toSaving)
  }, [clearTimers])

  const reset = useCallback(() => {
    clearTimers()
    setDirty(false)
    setSaveStatus('idle')
  }, [clearTimers])

  return { dirty, saveStatus, notifyChange, reset }
}
