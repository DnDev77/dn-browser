export function useFiveM() {
  const getParentResourceName = (): string => {
    const w = window as any
    return typeof w.GetParentResourceName === 'function'
      ? w.GetParentResourceName()
      : 'dn-browser'
  }

  const isFiveM = (): boolean =>
    typeof (window as any).GetParentResourceName === 'function'

  return {
    getParentResourceName,
    isFiveM,
  }
}
