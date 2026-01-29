import { useState, useRef, useMemo } from 'react'
import { useFiveM } from '../../hooks/useFiveM'
import { ApiService } from '../../services/api.service'
import { useConsoleSuppression } from '../../hooks/useConsoleSupression'
import { useConfig } from '../../hooks/useConfig'
import { useIframeState } from '../../hooks/useFrameState'
import { useTabletControl } from '../../hooks/useTabletControl'
import { useUrlMonitor } from '../../hooks/useUrlMonitor'
import { useNUIMessages } from '../../hooks/useNUIMessages'
import { TabletIframe } from '../TabletFrame'

function Main() {
  const [visible, setVisible] = useState(false)
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { getParentResourceName } = useFiveM()

  const apiService = useMemo(
    () => new ApiService(getParentResourceName()),
    []
  )

  const { config, setConfig, url, setUrl } = useConfig(apiService)

  const { saveIframeState, debouncedSave, clearDebounceTimer, getCachedState } =
    useIframeState({
      config,
      url,
      apiService,
    })

  const { suppressIframeOnLoad } = useConsoleSuppression(iframeRef)

  useTabletControl({
    visible,
    userId,
    config,
    apiService,
    saveIframeState: (playerId, _, immediate) => {
      const currentUrl = iframeRef.current?.src || url
      saveIframeState(playerId, currentUrl, immediate)
    },
    clearDebounceTimer,
  })

  useUrlMonitor({
    visible,
    userId,
    url,
    config,
    iframeRef,
    setUrl,
    debouncedSave,
  })

  useNUIMessages({
    setVisible,
    setUserId,
    setUrl,
    setConfig,
    setIsLoading,
    saveIframeState: (playerId, _, immediate) => {
      const currentUrl = iframeRef.current?.src || url
      saveIframeState(playerId, currentUrl, immediate)
    },
    getCachedState,
    config,
    userId,
  })

  // updated: always render, but hide with css
  return (
    <TabletIframe
      url={url}
      config={config}
      isLoading={isLoading}
      iframeRef={iframeRef}
      visible={visible}
      setIsLoading={setIsLoading}
      onIframeLoad={suppressIframeOnLoad}
    />
  )
}

export default Main