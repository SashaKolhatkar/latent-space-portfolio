import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SPACE_TONES, TONES } from '../data/latentData'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'ls-deep-space'

export function ThemeProvider({ children }) {
  const [spaceMode, setSpaceMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = spaceMode ? 'space' : 'latent'
    window.localStorage.setItem(STORAGE_KEY, String(spaceMode))
  }, [spaceMode])

  const value = useMemo(
    () => ({
      spaceMode,
      tones: spaceMode ? SPACE_TONES : TONES,
      toggleSpace: () => setSpaceMode((value) => !value),
    }),
    [spaceMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
