import type { IframeState, TabletConfig } from '../types'

export class ApiService {
  private resourceName: string;

  constructor(resourceName: string) {
    this.resourceName = resourceName;
  }

  async requestConfig(): Promise<Partial<TabletConfig>> {
    try {
      const res = await fetch(`https://${this.resourceName}/requestConfig`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      return await res.json()
    } catch {
      return {}
    }
  }

  async saveIframeData(state: IframeState, userId: string): Promise<void> {
    try {
      await fetch(`https://${this.resourceName}/saveIframeData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state, userId })
      })
    } catch {}
  }

  async closeTablet(): Promise<void> {
    try {
      await fetch(`https://${this.resourceName}/closeTablet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
    } catch {}
  }
}