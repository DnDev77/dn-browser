import { useEffect, useRef } from 'react'
import { ConsoleSuppressor } from '../services/console-supressor.service'

export function useConsoleSuppression(iframeRef: React.RefObject<HTMLIFrameElement | null>) {
  const suppressorRef = useRef(new ConsoleSuppressor())

  useEffect(() => {
    const suppressor = suppressorRef.current
    
    suppressor.suppressGlobalConsole()
    suppressor.suppressWindowErrors(window)

    const observer = new MutationObserver(() => {
      const iframe = iframeRef.current
      if (iframe?.contentWindow) {
        suppressor.suppressIframeConsole(iframe)
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      suppressor.restore()
      observer.disconnect()
    }
  }, [iframeRef])

  const suppressIframeOnLoad = (iframe: HTMLIFrameElement) => {
    const suppressor = suppressorRef.current
    suppressor.suppressIframeConsole(iframe)
    
    try {
      const iframeWindow = iframe.contentWindow
      if (iframeWindow) {
        suppressor.suppressWindowErrors(iframeWindow)
      }
    } catch {}
  }

  return { suppressIframeOnLoad }
}