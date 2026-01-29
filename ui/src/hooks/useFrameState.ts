import { useRef, useCallback } from 'react'
import type { IframeState, TabletConfig } from '../types'
import { ApiService } from '../services/api.service'

interface UseIframeStateProps {
  config: TabletConfig
  url: string
  apiService: ApiService
}

export function useIframeState({ config, url, apiService }: UseIframeStateProps) {
  const stateCache = useRef(new Map<string, IframeState>())
  const lastSaveTime = useRef(0)
  const saveDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const saveIframeState = useCallback(
    (
      playerId: string,
      iframeSrc: string,
      immediate = false,
      customUrl?: string
    ) => {
      const now = Date.now()

      if (!immediate && now - lastSaveTime.current < config.minSaveInterval) {
        return
      }

      const currentUrl = customUrl || iframeSrc || url
      const state: IframeState = { url: currentUrl, timestamp: now }

      stateCache.current.set(playerId, state)
      lastSaveTime.current = now

      apiService.saveIframeData(state, playerId)
    },
    [config.minSaveInterval, url, apiService]
  )

  const debouncedSave = useCallback(
    (playerId: string, currentUrl: string) => {
      if (saveDebounceTimer.current) {
        clearTimeout(saveDebounceTimer.current)
      }

      saveDebounceTimer.current = setTimeout(() => {
        saveIframeState(playerId, currentUrl, false, currentUrl)
      }, config.saveDebounceTime)
    },
    [config.saveDebounceTime, saveIframeState]
  )

  const clearDebounceTimer = useCallback(() => {
    if (saveDebounceTimer.current) {
      clearTimeout(saveDebounceTimer.current)
    }
  }, [])

  const getCachedState = useCallback((playerId: string) => {
    return stateCache.current.get(playerId)
  }, [])

  return {
    saveIframeState,
    debouncedSave,
    clearDebounceTimer,
    getCachedState,
  }
}