import { useEffect } from 'react'
import type { NUIMessage, TabletConfig, IframeState } from '../types'

interface UseNUIMessagesProps {
  setVisible: (visible: boolean) => void
  setUserId: (userId: string) => void
  setUrl: (url: string) => void
  setConfig: React.Dispatch<React.SetStateAction<TabletConfig>>
  setIsLoading: (loading: boolean) => void
  saveIframeState: (playerId: string, iframeSrc: string, immediate?: boolean) => void
  getCachedState: (playerId: string) => IframeState | undefined
  config: TabletConfig
  userId: string
}

export function useNUIMessages({
  setVisible,
  setUserId,
  setUrl,
  setConfig,
  setIsLoading,
  saveIframeState,
  getCachedState,
  config,
  userId,
}: UseNUIMessagesProps) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent<NUIMessage>) => {
      const {
        action,
        visible: isVisible,
        userId: playerUserId,
        config: msgConfig,
      } = event.data

      if (action === 'setVisible') {
        setVisible(!!isVisible)

        if (playerUserId) {
          setUserId(playerUserId)

          if (isVisible) {

            if (msgConfig) {
              setConfig((prev) => ({
                ...prev,
                ...Object.fromEntries(
                  Object.entries(msgConfig).filter(([_, v]) => v !== undefined)
                ),
              }))
            }

            setIsLoading(true)
          }
        }
      }

      if (action === 'requestSave' && userId) {
        saveIframeState(userId, '', true)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [
    userId,
    config.defaultUrl,
    setVisible,
    setUserId,
    setUrl,
    setConfig,
    setIsLoading,
    saveIframeState,
    getCachedState,
  ])
}