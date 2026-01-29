import { useEffect } from 'react'

import type { TabletConfig } from '../types'



interface UseUrlMonitorProps {

  visible: boolean

  userId: string

  url: string

  config: TabletConfig

  iframeRef: React.RefObject<HTMLIFrameElement | null>

  setUrl: (url: string) => void

  debouncedSave: (playerId: string, currentUrl: string) => void

}



export function useUrlMonitor({

  visible,

  userId,

  url,

  config,

  iframeRef,

  setUrl,

  debouncedSave,

}: UseUrlMonitorProps) {

  useEffect(() => {

    if (!visible || !userId) return



    const checkIframeUrl = () => {

      try {

        const currentUrl = iframeRef.current?.src

        if (currentUrl && currentUrl !== url) {

          setUrl(currentUrl)

          debouncedSave(userId, currentUrl)

        }

      } catch {}

    }



    const interval = setInterval(checkIframeUrl, config.urlCheckInterval)

    return () => clearInterval(interval)

  }, [visible, userId, url, config.urlCheckInterval, iframeRef, setUrl, debouncedSave])

}