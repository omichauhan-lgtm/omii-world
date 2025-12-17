import { useEffect, useState } from 'react'

export function SoundManager() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioElement, setAudioElement] = useState(null)

    useEffect(() => {
        // 1. Find the audio element in index.html
        const el = document.getElementById('bg-audio')
        if (el) {
            setAudioElement(el)
            // Check if it's already playing (started by Loader)
            if (!el.paused) {
                setIsPlaying(true)
            }

            // Listen for play/pause events from outside
            const onPlay = () => setIsPlaying(true)
            const onPause = () => setIsPlaying(false)
            el.addEventListener('play', onPlay)
            el.addEventListener('pause', onPause)

            return () => {
                el.removeEventListener('play', onPlay)
                el.removeEventListener('pause', onPause)
            }
        }
    }, [])

    const toggleSound = () => {
        if (!audioElement) return

        if (isPlaying) {
            audioElement.pause()
        } else {
            audioElement.play().catch(e => console.error("Play failed", e))
        }
    }

    // Pure HTML UI (No @react-three/drei needed since it's outside Canvas)
    return (
        <div style={{
            position: 'fixed',
            top: '20px',    /* TOP */
            right: '25px',  /* RIGHT */
            zIndex: 2000,   /* Above Loader (9999) check z-index needs priority */
            /* Note: Loader is 99999, so we only see this AFTER loader fades out */
        }}>
            <button
                onClick={toggleSound}
                style={{
                    background: isPlaying ? 'rgba(0, 255, 204, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                    border: isPlaying ? '2px solid #00ffcc' : '2px solid #ff6b6b',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: 'white',
                    transition: 'all 0.3s ease'
                }}
                title="Toggle Music"
            >
                {isPlaying ? '🔊' : '🔇'}
            </button>
        </div>
    )
}
