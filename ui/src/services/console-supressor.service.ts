export class ConsoleSuppressor {
  private originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug,
  }

  private noop = () => {}

  suppressGlobalConsole(): void {
    console.log = this.noop
    console.warn = this.noop
    console.error = this.noop
    console.info = this.noop
    console.debug = this.noop
  }

  suppressIframeConsole(iframe: HTMLIFrameElement): void {
    try {
      const iframeWindow = iframe.contentWindow
      if (iframeWindow) {
        // @ts-ignore
        iframeWindow.console.log = this.noop
        // @ts-ignore
        iframeWindow.console.warn = this.noop
        // @ts-ignore
        iframeWindow.console.error = this.noop
        // @ts-ignore
        iframeWindow.console.info = this.noop
        // @ts-ignore
        iframeWindow.console.debug = this.noop
      }
    } catch {}
  }

  suppressWindowErrors(window: Window): void {
    window.addEventListener('error', (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      return false
    }, true)

    window.addEventListener('unhandledrejection', (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
    }, true)
  }

  restore(): void {
    console.log = this.originalConsole.log
    console.warn = this.originalConsole.warn
    console.error = this.originalConsole.error
    console.info = this.originalConsole.info
    console.debug = this.originalConsole.debug
  }
}