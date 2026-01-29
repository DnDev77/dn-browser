import { useEffect, useCallback } from 'react'
import type { TabletConfig } from '../types'
import { ApiService } from '../services/api.service'

interface UseTabletControlProps {
  visible: boolean
  userId: string
  config: TabletConfig
  apiService: ApiService
  saveIframeState: (playerId: string, iframeSrc: string, immediate?: boolean) => void
  clearDebounceTimer: () => void
}

export function useTabletControl({
  visible,
  userId,
  config,
  apiService,
  saveIframeState,
  clearDebounceTimer,
}: UseTabletControlProps) {
  const closeTablet = useCallback(() => {
    if (userId) {
      saveIframeState(userId, '', true)
    }
    clearDebounceTimer()
    apiService.closeTablet()
  }, [userId, saveIframeState, clearDebounceTimer, apiService])

  useEffect(() => {
    if (!visible || !config.closeOnEscape) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeTablet()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [visible, config.closeOnEscape, closeTablet])

  useEffect(() => {
    if (!visible && userId) {
      saveIframeState(userId, '', true)
    }
  }, [visible, userId, saveIframeState])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (userId && visible) {
        saveIframeState(userId, '', true)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [userId, visible, saveIframeState])

  return { closeTablet }
}