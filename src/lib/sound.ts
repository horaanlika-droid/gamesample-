export type SoundName = 'start' | 'tap' | 'swipe' | 'correct' | 'wrong' | 'tick' | 'finish'

let context: AudioContext | null = null

function getContext() {
  if (typeof window === 'undefined') return null
  const AudioContextClass = window.AudioContext
  if (!AudioContextClass) return null
  context ??= new AudioContextClass()
  if (context.state === 'suspended') void context.resume()
  return context
}

function tone(
  audio: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  volume: number,
  type: OscillatorType = 'sine',
) {
  const oscillator = audio.createOscillator()
  const gain = audio.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  oscillator.connect(gain)
  gain.connect(audio.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.02)
}

export function unlockAudio() {
  getContext()
}

export function playSound(name: SoundName, enabled: boolean) {
  if (!enabled) return
  const audio = getContext()
  if (!audio) return
  const now = audio.currentTime

  switch (name) {
    case 'start':
      tone(audio, 430, now, 0.1, 0.045, 'triangle')
      tone(audio, 590, now + 0.1, 0.11, 0.045, 'triangle')
      tone(audio, 790, now + 0.2, 0.18, 0.05, 'triangle')
      break
    case 'tap':
      tone(audio, 260, now, 0.06, 0.022, 'sine')
      break
    case 'swipe':
      tone(audio, 310, now, 0.08, 0.02, 'triangle')
      tone(audio, 430, now + 0.045, 0.08, 0.018, 'triangle')
      break
    case 'correct':
      tone(audio, 650, now, 0.09, 0.04, 'sine')
      tone(audio, 880, now + 0.07, 0.13, 0.035, 'sine')
      break
    case 'wrong':
      tone(audio, 180, now, 0.16, 0.04, 'square')
      tone(audio, 145, now + 0.09, 0.2, 0.03, 'square')
      break
    case 'tick':
      tone(audio, 520, now, 0.08, 0.032, 'triangle')
      break
    case 'finish':
      tone(audio, 523, now, 0.12, 0.045, 'triangle')
      tone(audio, 659, now + 0.11, 0.12, 0.045, 'triangle')
      tone(audio, 784, now + 0.22, 0.22, 0.05, 'triangle')
      break
  }
}
