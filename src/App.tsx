import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { ItemArtwork, ITEMS, type ItemDefinition } from './components/ItemArtwork'
import { Mascot } from './components/Mascot'
import {
  ArrowIcon,
  ClockIcon,
  CloseIcon,
  HandTapIcon,
  HomeIcon,
  PauseIcon,
  PlayIcon,
  ReplayIcon,
  ShareIcon,
  SoundOffIcon,
  SoundOnIcon,
  SparkIcon,
  SwipeIcon,
  TrophyIcon,
} from './components/Icons'
import {
  hapticImpact,
  hapticNotification,
  hapticSelection,
  initTelegram,
  telegramApp,
} from './lib/telegram'
import { playSound, unlockAudio } from './lib/sound'

type Screen = 'home' | 'countdown' | 'playing' | 'paused' | 'result'
type Action = 'tap' | 'swipe' | 'timeout'
type Feedback = {
  correct: boolean
  action: Action
  text: string
  points: number
  token: number
}
type Stats = {
  correct: number
  mistakes: number
  total: number
  maxStreak: number
}
type DragState = {
  x: number
  y: number
  active: boolean
}

const GAME_DURATION = 30_000
const EMPTY_STATS: Stats = { correct: 0, mistakes: 0, total: 0, maxStreak: 0 }

function readNumber(key: string) {
  try {
    const value = Number(localStorage.getItem(key))
    return Number.isFinite(value) ? value : 0
  } catch {
    return 0
  }
}

function readBoolean(key: string, fallback: boolean) {
  try {
    const stored = localStorage.getItem(key)
    return stored === null ? fallback : stored === 'true'
  } catch {
    return fallback
  }
}

function pickNext(previous?: ItemDefinition) {
  const wantsFood = Math.random() > 0.5
  let pool = ITEMS.filter((item) => item.edible === wantsFood && item.kind !== previous?.kind)
  if (pool.length === 0) pool = ITEMS.filter((item) => item.kind !== previous?.kind)
  return pool[Math.floor(Math.random() * pool.length)]
}

function scoreTitle(score: number) {
  if (score >= 480) return 'Легенда кухни!'
  if (score >= 300) return 'Кухонная молния!'
  if (score >= 160) return 'Ловкие лапки!'
  return 'Разминка засчитана!'
}

function formatScore(score: number) {
  return new Intl.NumberFormat('ru-RU').format(score)
}

function SoundButton({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      className="icon-button"
      type="button"
      onClick={onToggle}
      aria-label={enabled ? 'Выключить звук' : 'Включить звук'}
    >
      {enabled ? <SoundOnIcon /> : <SoundOffIcon />}
    </button>
  )
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`} aria-label="Шмыг! Кухонный блиц">
      <span className="brand__word">ШМЫГ</span>
      <span className="brand__bang">!</span>
      {!compact && <span className="brand__subtitle">кухонный блиц</span>}
    </div>
  )
}

function Burst({ good, token }: { good: boolean; token: number }) {
  const colors = good
    ? ['#FFD558', '#FF7658', '#75C9A0', '#6DC5DF', '#A881ED']
    : ['#FF6B62', '#49415E', '#FFB14F']
  return (
    <div className={`burst ${good ? 'burst--good' : 'burst--bad'}`} key={token} aria-hidden="true">
      {Array.from({ length: good ? 10 : 6 }, (_, index) => {
        const angle = (360 / (good ? 10 : 6)) * index - 90
        return (
          <span
            key={index}
            style={
              {
                '--angle': `${angle}deg`,
                '--distance': `${58 + (index % 3) * 13}px`,
                '--particle-color': colors[index % colors.length],
                '--delay': `${(index % 2) * 24}ms`,
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [soundEnabled, setSoundEnabled] = useState(() => readBoolean('shmyg-sound', true))
  const [bestScore, setBestScore] = useState(() => readNumber('shmyg-best'))
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [stats, setStats] = useState<Stats>(EMPTY_STATS)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [countdown, setCountdown] = useState(3)
  const [currentItem, setCurrentItem] = useState<ItemDefinition>(() => pickNext())
  const [round, setRound] = useState(0)
  const [tilt, setTilt] = useState(0)
  const [drag, setDrag] = useState<DragState>({ x: 0, y: 0, active: false })
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [newRecord, setNewRecord] = useState(false)
  const [shareDone, setShareDone] = useState(false)

  const currentRef = useRef(currentItem)
  const scoreRef = useRef(0)
  const statsRef = useRef<Stats>(EMPTY_STATS)
  const streakRef = useRef(0)
  const endAtRef = useRef(0)
  const lockedRef = useRef(false)
  const finishingRef = useRef(false)
  const nextRoundTimerRef = useRef<number | null>(null)
  const pointerRef = useRef<{ id: number; x: number; y: number; at: number } | null>(null)

  useEffect(() => {
    initTelegram()
  }, [])

  useEffect(() => {
    currentRef.current = currentItem
  }, [currentItem])

  useEffect(() => {
    try {
      localStorage.setItem('shmyg-sound', String(soundEnabled))
    } catch {
      // Storage can be unavailable in privacy mode; the game still works.
    }
  }, [soundEnabled])

  const goHome = useCallback(() => {
    if (nextRoundTimerRef.current !== null) window.clearTimeout(nextRoundTimerRef.current)
    pointerRef.current = null
    lockedRef.current = false
    finishingRef.current = false
    setDrag({ x: 0, y: 0, active: false })
    setFeedback(null)
    setScreen('home')
    hapticSelection()
  }, [])

  useEffect(() => {
    const app = telegramApp()
    const backButton = app?.BackButton
    if (!app || !backButton) return

    if (screen === 'home') {
      backButton.hide()
      app.enableVerticalSwipes?.()
      return
    }

    backButton.show()
    backButton.onClick(goHome)
    if (screen === 'playing' || screen === 'countdown') app.disableVerticalSwipes?.()
    else app.enableVerticalSwipes?.()

    return () => backButton.offClick(goHome)
  }, [goHome, screen])

  const finishGame = useCallback(() => {
    if (finishingRef.current) return
    finishingRef.current = true
    lockedRef.current = true
    if (nextRoundTimerRef.current !== null) window.clearTimeout(nextRoundTimerRef.current)

    const finalScore = scoreRef.current
    const isRecord = finalScore > bestScore
    setNewRecord(isRecord)
    if (isRecord) {
      setBestScore(finalScore)
      try {
        localStorage.setItem('shmyg-best', String(finalScore))
      } catch {
        // Ignore unavailable storage.
      }
    }
    setShareDone(false)
    setScreen('result')
    playSound('finish', soundEnabled)
    hapticNotification('success')
  }, [bestScore, soundEnabled])

  useEffect(() => {
    if (screen !== 'playing') return

    const updateTimer = () => {
      const remaining = Math.max(0, endAtRef.current - performance.now())
      setTimeLeft(remaining)
      if (remaining <= 0) finishGame()
    }

    updateTimer()
    const timer = window.setInterval(updateTimer, 80)
    return () => window.clearInterval(timer)
  }, [finishGame, screen])

  const advanceRound = useCallback(() => {
    const next = pickNext(currentRef.current)
    currentRef.current = next
    lockedRef.current = false
    setCurrentItem(next)
    setRound((value) => value + 1)
    setTilt(Math.round(Math.random() * 12 - 6))
    setDrag({ x: 0, y: 0, active: false })
    setFeedback(null)
  }, [])

  const resolveAction = useCallback(
    (action: Action, vector?: { x: number; y: number }) => {
      if (screen !== 'playing' || lockedRef.current || finishingRef.current) return
      lockedRef.current = true

      const item = currentRef.current
      const correct = action !== 'timeout' && (action === 'tap' ? item.edible : !item.edible)
      const nextStreak = correct ? streakRef.current + 1 : 0
      const multiplier = Math.min(4, 1 + Math.floor(nextStreak / 5))
      const points = correct ? 10 * multiplier : 0
      const nextScore = correct ? scoreRef.current + points : Math.max(0, scoreRef.current - 5)
      const nextStats: Stats = {
        correct: statsRef.current.correct + (correct ? 1 : 0),
        mistakes: statsRef.current.mistakes + (correct ? 0 : 1),
        total: statsRef.current.total + 1,
        maxStreak: Math.max(statsRef.current.maxStreak, nextStreak),
      }

      scoreRef.current = nextScore
      streakRef.current = nextStreak
      statsRef.current = nextStats
      setScore(nextScore)
      setStreak(nextStreak)
      setStats(nextStats)

      if (action === 'swipe') {
        const length = Math.hypot(vector?.x ?? 1, vector?.y ?? 0) || 1
        setDrag({
          x: ((vector?.x ?? 1) / length) * 520,
          y: ((vector?.y ?? 0) / length) * 420,
          active: false,
        })
      }

      let text = ''
      if (correct) text = item.edible ? 'Ням!' : 'Фью-ю-ить!'
      else if (action === 'timeout') text = 'Шевели лапками!'
      else if (item.edible) text = 'Это же еда!'
      else text = 'Такое не едят!'

      setFeedback({
        correct,
        action,
        text,
        points,
        token: round + 1,
      })

      if (correct) {
        playSound('correct', soundEnabled)
        hapticNotification('success')
      } else {
        playSound('wrong', soundEnabled)
        hapticNotification('warning')
      }

      nextRoundTimerRef.current = window.setTimeout(advanceRound, correct ? 310 : 440)
    },
    [advanceRound, round, screen, soundEnabled],
  )

  useEffect(() => {
    if (screen !== 'playing' || lockedRef.current) return
    const elapsed = GAME_DURATION - timeLeft
    const roundWindow = Math.max(1_150, 2_350 - (elapsed / GAME_DURATION) * 850)
    const timer = window.setTimeout(() => resolveAction('timeout'), roundWindow)
    return () => window.clearTimeout(timer)
    // A new round deliberately restarts this per-item timer.
  }, [round, screen, resolveAction])

  useEffect(() => {
    if (screen !== 'countdown') return

    if (countdown <= 0) {
      playSound('start', soundEnabled)
      hapticImpact('medium')
      endAtRef.current = performance.now() + GAME_DURATION
      setTimeLeft(GAME_DURATION)
      setScreen('playing')
      return
    }

    playSound('tick', soundEnabled)
    hapticImpact('light')
    const timer = window.setTimeout(() => setCountdown((value) => value - 1), 720)
    return () => window.clearTimeout(timer)
  }, [countdown, screen, soundEnabled])

  useEffect(() => {
    if (screen !== 'playing') return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        hapticImpact('light')
        resolveAction('tap')
      } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault()
        const vectors: Record<string, { x: number; y: number }> = {
          ArrowLeft: { x: -1, y: 0 },
          ArrowRight: { x: 1, y: 0 },
          ArrowUp: { x: 0, y: -1 },
          ArrowDown: { x: 0, y: 1 },
        }
        hapticImpact('medium')
        resolveAction('swipe', vectors[event.key])
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [resolveAction, screen])

  useEffect(
    () => () => {
      if (nextRoundTimerRef.current !== null) window.clearTimeout(nextRoundTimerRef.current)
    },
    [],
  )

  const startGame = () => {
    unlockAudio()
    hapticImpact('medium')
    if (nextRoundTimerRef.current !== null) window.clearTimeout(nextRoundTimerRef.current)
    const first = pickNext()
    currentRef.current = first
    scoreRef.current = 0
    streakRef.current = 0
    statsRef.current = EMPTY_STATS
    finishingRef.current = false
    lockedRef.current = false
    setCurrentItem(first)
    setScore(0)
    setStreak(0)
    setStats(EMPTY_STATS)
    setTimeLeft(GAME_DURATION)
    setCountdown(3)
    setRound(0)
    setTilt(Math.round(Math.random() * 12 - 6))
    setDrag({ x: 0, y: 0, active: false })
    setFeedback(null)
    setNewRecord(false)
    setScreen('countdown')
  }

  const toggleSound = () => {
    unlockAudio()
    const next = !soundEnabled
    setSoundEnabled(next)
    hapticSelection()
    if (next) playSound('tick', true)
  }

  const pauseGame = () => {
    const remaining = Math.max(0, endAtRef.current - performance.now())
    setTimeLeft(remaining)
    setScreen('paused')
    hapticImpact('light')
  }

  const resumeGame = () => {
    endAtRef.current = performance.now() + timeLeft
    setScreen('playing')
    hapticImpact('medium')
    playSound('start', soundEnabled)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (screen !== 'playing' || lockedRef.current) return
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      at: performance.now(),
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDrag((value) => ({ ...value, active: true }))
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId || lockedRef.current) return
    const x = event.clientX - pointer.x
    const y = event.clientY - pointer.y
    setDrag({ x, y, active: true })
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId || lockedRef.current) return
    const x = event.clientX - pointer.x
    const y = event.clientY - pointer.y
    const distance = Math.hypot(x, y)
    const duration = Math.max(1, performance.now() - pointer.at)
    const velocity = distance / duration
    pointerRef.current = null

    if (distance > 54 || (distance > 28 && velocity > 0.55)) {
      hapticImpact('medium')
      playSound('swipe', soundEnabled)
      resolveAction('swipe', { x, y })
    } else if (distance < 18) {
      // Every game tap gets an immediate tactile response, before correctness is evaluated.
      hapticImpact('light')
      playSound('tap', soundEnabled)
      resolveAction('tap')
    } else {
      setDrag({ x: 0, y: 0, active: false })
    }
  }

  const onPointerCancel = () => {
    pointerRef.current = null
    setDrag({ x: 0, y: 0, active: false })
  }

  const shareResult = async () => {
    hapticImpact('light')
    const text = `Я набрал ${score} очков в «Шмыг!» 🐭 Сможешь быстрее?`
    const url = window.location.href.split('?')[0]
    const app = telegramApp()

    if (app?.openTelegramLink) {
      app.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      )
      return
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Шмыг! Кухонный блиц', text, url })
        return
      } catch {
        // The user may cancel the native share sheet; offer a clipboard fallback.
      }
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      setShareDone(true)
      window.setTimeout(() => setShareDone(false), 1800)
    } catch {
      setShareDone(false)
    }
  }

  const seconds = Math.max(0, Math.ceil(timeLeft / 1000))
  const timerProgress = Math.max(0, Math.min(1, timeLeft / GAME_DURATION))
  const multiplier = Math.min(4, 1 + Math.floor(streak / 5))
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
  const isGameScreen = screen === 'countdown' || screen === 'playing' || screen === 'paused'
  const gameItemStyle = {
    '--drag-x': `${drag.x}px`,
    '--drag-y': `${drag.y}px`,
    '--drag-rotate': `${tilt + drag.x * 0.045}deg`,
  } as CSSProperties
  const timerStyle = { '--timer-progress': `${timerProgress * 360}deg` } as CSSProperties
  const resultConfetti = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        left: `${5 + ((index * 37) % 90)}%`,
        delay: `${(index % 7) * 90}ms`,
        color: ['#FF7057', '#FFD456', '#73C8A0', '#6DC4DE', '#9B7CE6'][index % 5],
        rotate: `${(index * 47) % 180}deg`,
      })),
    [],
  )

  return (
    <main className={`app-viewport app-viewport--${screen}`}>
      <div className="ambient ambient--one" aria-hidden="true" />
      <div className="ambient ambient--two" aria-hidden="true" />
      <section className="app-shell">
        {screen === 'home' && (
          <div className="screen screen--home">
            <header className="home-header">
              <Brand />
              <div className="home-header__actions">
                {bestScore > 0 && (
                  <div className="best-pill" aria-label={`Рекорд: ${bestScore}`}>
                    <TrophyIcon />
                    <span>{formatScore(bestScore)}</span>
                  </div>
                )}
                <SoundButton enabled={soundEnabled} onToggle={toggleSound} />
              </div>
            </header>

            <div className="hero">
              <div className="hero__speech">Еду — лови!</div>
              <div className="hero__spark hero__spark--one">✦</div>
              <div className="hero__spark hero__spark--two">●</div>
              <Mascot />
            </div>

            <div className="home-copy">
              <div className="eyebrow"><span /> Твои правила <span /></div>
              <h1>Лапки готовы?</h1>
            </div>

            <div className="rule-grid">
              <div className="rule-card rule-card--tap">
                <div className="rule-card__art">
                  <ItemArtwork kind="cheese" decorative />
                  <span className="rule-card__action"><HandTapIcon /></span>
                </div>
                <strong>Еда</strong>
                <span>тапай</span>
              </div>
              <div className="rule-card rule-card--swipe">
                <div className="rule-card__art">
                  <ItemArtwork kind="sock" decorative />
                  <span className="rule-card__action"><SwipeIcon /></span>
                </div>
                <strong>Не еда</strong>
                <span>смахивай</span>
              </div>
            </div>

            <div className="home-cta">
              <button className="primary-button primary-button--play" type="button" onClick={startGame}>
                <span>Играть</span>
                <span className="primary-button__icon"><ArrowIcon /></span>
              </button>
              <p><ClockIcon /> 30 секунд · темп растёт</p>
            </div>
          </div>
        )}

        {isGameScreen && (
          <div className="screen screen--game">
            <header className="game-header">
              <div className={`timer-pill ${seconds <= 5 ? 'timer-pill--urgent' : ''}`} style={timerStyle}>
                <div className="timer-pill__inner">
                  <ClockIcon />
                  <strong>{seconds}</strong>
                </div>
              </div>
              <Brand compact />
              <button className="icon-button icon-button--pause" type="button" onClick={pauseGame} aria-label="Пауза">
                <PauseIcon />
              </button>
            </header>

            <div className="score-row">
              <div>
                <span className="score-row__label">Счёт</span>
                <strong className="score-row__value">{formatScore(score)}</strong>
              </div>
              <div className={`combo-pill ${streak >= 2 ? 'combo-pill--active' : ''}`}>
                <SparkIcon />
                <span>серия {streak}</span>
                {multiplier > 1 && <b>×{multiplier}</b>}
              </div>
            </div>

            <div className="time-track" aria-hidden="true">
              <span style={{ width: `${timerProgress * 100}%` }} />
            </div>

            <div className="game-prompt">
              <span>Что перед тобой?</span>
              <strong>Тап или свайп</strong>
            </div>

            <div className={`game-stage ${feedback ? (feedback.correct ? 'game-stage--correct' : 'game-stage--wrong') : ''}`}>
              <div className="stage-tiles" aria-hidden="true" />
              <div className="stage-shelf" aria-hidden="true">
                <span /><span /><span />
              </div>
              <div className="plate-shadow" aria-hidden="true" />

              <div
                className={`game-item ${drag.active ? 'game-item--dragging' : ''} ${
                  feedback
                    ? feedback.correct
                      ? feedback.action === 'tap'
                        ? 'game-item--eaten'
                        : 'game-item--thrown'
                      : feedback.action === 'timeout'
                        ? 'game-item--missed'
                        : 'game-item--wrong'
                    : ''
                }`}
                key={round}
                style={gameItemStyle}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
                role="button"
                tabIndex={0}
                aria-label={`${currentItem.label}. Нажмите, если это еда, или смахните, если это не еда.`}
              >
                <ItemArtwork kind={currentItem.kind} />
                <span className="game-item__shine" aria-hidden="true" />
              </div>

              {feedback && (
                <div className={`feedback-pop ${feedback.correct ? 'feedback-pop--good' : 'feedback-pop--bad'}`} key={feedback.token} aria-live="polite">
                  <strong>{feedback.text}</strong>
                  {feedback.correct && <span>+{feedback.points}</span>}
                </div>
              )}
              {feedback && <Burst good={feedback.correct} token={feedback.token} />}

              <div className="chef-peek" aria-hidden="true">
                <span className="chef-peek__ear chef-peek__ear--left" />
                <span className="chef-peek__ear chef-peek__ear--right" />
                <span className="chef-peek__head">
                  <i className="chef-peek__eye chef-peek__eye--left" />
                  <i className="chef-peek__eye chef-peek__eye--right" />
                  <i className="chef-peek__nose" />
                </span>
                <span className="chef-peek__paw chef-peek__paw--left" />
                <span className="chef-peek__paw chef-peek__paw--right" />
              </div>
            </div>

            <div className="game-legend" aria-hidden="true">
              <span className="game-legend__tap"><HandTapIcon /> еда</span>
              <i />
              <span className="game-legend__swipe">не еда <SwipeIcon /></span>
            </div>

            {screen === 'countdown' && (
              <div className="game-overlay countdown-overlay">
                <span className="countdown-overlay__top">Приготовились</span>
                <strong key={countdown}>{countdown || 'Шмыг!'}</strong>
                <div className="countdown-overlay__dots"><i /><i /><i /></div>
              </div>
            )}

            {screen === 'paused' && (
              <div className="game-overlay pause-overlay">
                <button className="pause-overlay__close" type="button" onClick={goHome} aria-label="Закрыть игру">
                  <CloseIcon />
                </button>
                <div className="pause-overlay__icon"><PauseIcon /></div>
                <span>Передышка</span>
                <h2>Шеф ждёт тебя</h2>
                <button className="primary-button" type="button" onClick={resumeGame}>
                  <PlayIcon /> Продолжить
                </button>
                <button className="text-button" type="button" onClick={goHome}>В меню</button>
              </div>
            )}
          </div>
        )}

        {screen === 'result' && (
          <div className="screen screen--result">
            <div className="result-confetti" aria-hidden="true">
              {resultConfetti.map((piece, index) => (
                <i
                  key={index}
                  style={
                    {
                      left: piece.left,
                      '--delay': piece.delay,
                      '--confetti-color': piece.color,
                      '--confetti-rotate': piece.rotate,
                    } as CSSProperties
                  }
                />
              ))}
            </div>

            <header className="result-header">
              <button className="icon-button" type="button" onClick={goHome} aria-label="На главную">
                <CloseIcon />
              </button>
              <Brand compact />
              <SoundButton enabled={soundEnabled} onToggle={toggleSound} />
            </header>

            <div className="result-hero">
              {newRecord && <div className="record-ribbon"><TrophyIcon /> Новый рекорд</div>}
              <Mascot mood={stats.mistakes > stats.correct ? 'oops' : 'celebrate'} />
            </div>

            <div className="result-copy">
              <span>{scoreTitle(score)}</span>
              <div className="result-score">
                <strong>{formatScore(score)}</strong>
                <small>очков</small>
              </div>
            </div>

            <div className="stat-grid">
              <div className="stat-card">
                <span className="stat-card__icon stat-card__icon--mint">✓</span>
                <div><strong>{accuracy}%</strong><span>точность</span></div>
              </div>
              <div className="stat-card">
                <span className="stat-card__icon stat-card__icon--yellow">✦</span>
                <div><strong>{stats.maxStreak}</strong><span>макс. серия</span></div>
              </div>
            </div>

            <div className="result-actions">
              <button className="primary-button" type="button" onClick={startGame}>
                <ReplayIcon /> Ещё раз
              </button>
              <div className="result-actions__secondary">
                <button className="secondary-button" type="button" onClick={goHome}>
                  <HomeIcon /> Меню
                </button>
                <button className="secondary-button secondary-button--share" type="button" onClick={shareResult}>
                  <ShareIcon /> {shareDone ? 'Скопировано' : 'Поделиться'}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
