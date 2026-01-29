export interface IframeState {
  url: string
  timestamp: number
}

export interface TabletConfig {
  defaultUrl: string
  iframeTitle: string
  sandbox: string
  allow: string
  urlCheckInterval: number
  saveDebounceTime: number
  minSaveInterval: number
  closeOnEscape: boolean
  showLoading?: boolean
}

export interface NUIMessage {
  action: 'setVisible' | 'requestSave'
  visible?: boolean
  userId?: string
  savedState?: IframeState
  config?: Partial<TabletConfig>
}

export const DEFAULT_CONFIG: TabletConfig = {
  defaultUrl: 'https://h2.bet.br',
  iframeTitle: 'H2 Frame',
  sandbox: 'allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation',
  allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  urlCheckInterval: 2000,
  saveDebounceTime: 1500,
  minSaveInterval: 1000,
  closeOnEscape: true,
}