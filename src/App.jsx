import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CaseStudy from './components/CaseStudy'
import ClusterDock from './components/ClusterDock'
import CosmicBackdrop from './components/CosmicBackdrop'
import Hud from './components/Hud'
import LatentCanvas from './components/LatentCanvas'
import MobileCards from './components/MobileCards'
import QuickCv from './components/QuickCv'
import { ArrowLeftIcon } from './components/icons'
import { useTheme } from './context/ThemeContext'
import { useIsMobile } from './hooks/useIsMobile'

export default function App() {
  const { spaceMode } = useTheme()
  const [mode, setMode] = useState('domain')
  const [cvMode, setCvMode] = useState(false)
  const [mobileMap, setMobileMap] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState(null)
  const coordRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveProjectId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const toggleCv = () => {
    setActiveProjectId(null)
    setCvMode((value) => !value)
  }

  const showCanvas = !isMobile || mobileMap

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-obsidian">
      {spaceMode && <CosmicBackdrop animated={!cvMode} />}
      <Hud cvMode={cvMode} onToggleCv={toggleCv} coordRef={coordRef} />

      {cvMode ? (
        <QuickCv onExit={toggleCv} />
      ) : showCanvas ? (
        <>
          <LatentCanvas
            mode={mode}
            focusedId={activeProjectId}
            coordRef={coordRef}
            onOpenProject={setActiveProjectId}
          />
          <ClusterDock mode={mode} onChange={setMode} />
          {isMobile && (
            <button
              type="button"
              onClick={() => {
                setActiveProjectId(null)
                setMobileMap(false)
              }}
              className="no-print pill-button absolute left-4 top-24 z-30 border border-white/10 bg-[#0C0E15]/85 px-3 py-2 text-slate-300 backdrop-blur-lg"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Cards
            </button>
          )}
        </>
      ) : (
        <MobileCards onExploreMap={() => setMobileMap(true)} onOpenProject={setActiveProjectId} />
      )}

      {!cvMode && <div className="vignette scan-overlay pointer-events-none fixed inset-0 z-[15]" aria-hidden="true" />}

      <AnimatePresence>
        {activeProjectId && !cvMode && (
          <CaseStudy key={activeProjectId} projectId={activeProjectId} onClose={() => setActiveProjectId(null)} />
        )}
      </AnimatePresence>
    </main>
  )
}
