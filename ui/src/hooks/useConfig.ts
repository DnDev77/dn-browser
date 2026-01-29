import { useState, useEffect } from 'react'
import type { TabletConfig } from '../types'
import { DEFAULT_CONFIG } from '../types'
import { ApiService } from '../services/api.service'

export function useConfig(apiService: ApiService) {
  const [config, setConfig] = useState<TabletConfig>(DEFAULT_CONFIG)
  const [url, setUrl] = useState(DEFAULT_CONFIG.defaultUrl)

  useEffect(() => {
    apiService
      .requestConfig()
      .then((data) => {
        setConfig((prev) => ({ ...prev, ...data }))
        if (data.defaultUrl) {
          setUrl(data.defaultUrl)
        }
      })
      .catch(() => setConfig(DEFAULT_CONFIG))
  }, [apiService])

  return { config, setConfig, url, setUrl }
}