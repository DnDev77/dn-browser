import { useEffect } from 'react'
import type { TabletConfig } from '../../types'

interface TabletIframeProps {
  url: string
  config: TabletConfig
  isLoading: boolean
  visible: boolean
  iframeRef: React.RefObject<HTMLIFrameElement | null>
  setIsLoading: (loading: boolean) => void
  onIframeLoad: (iframe: HTMLIFrameElement) => void
}

export function TabletIframe({
  url,
  config,
  isLoading,
  visible,
  iframeRef,
  setIsLoading,
  onIframeLoad,
}: TabletIframeProps) {
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        setIsLoading(false)
        if (iframeRef.current) {
          onIframeLoad(iframeRef.current)
        }
      }
    }
  }, [url, iframeRef, setIsLoading, onIframeLoad])

  return (
    <div 
      className="tablet-container" 
      style={{ 
        visibility: visible ? 'visible' : 'hidden',
        pointerEvents: visible ? 'auto' : 'none'
      }}
    >
      <div className="tablet-frame">
        <div className="tablet-screen">
          {isLoading && config.showLoading !== false && visible && (
            <div className="tablet-loading">
              <div className="loading-spinner" />
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={`http://localhost:3001/proxy/${new URL(url).pathname}${new URL(url).search}`}
            title={config.iframeTitle}
            className="tablet-iframe"
            sandbox={config.sandbox}
            allow="autoplay; encrypted-media; fullscreen; geolocation; microphone; camera; payment; accelerometer; gyroscope; magnetometer; midi; usb; vr; xr-spatial-tracking"
          />
        </div>
      </div>
    </div>
  )
}