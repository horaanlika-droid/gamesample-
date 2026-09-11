type HapticStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
type NotificationType = 'error' | 'success' | 'warning'

type TelegramWebApp = {
  ready: () => void
  expand: () => void
  close: () => void
  disableVerticalSwipes?: () => void
  enableVerticalSwipes?: () => void
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
  openTelegramLink?: (url: string) => void
  HapticFeedback?: {
    impactOccurred: (style: HapticStyle) => void
    notificationOccurred: (type: NotificationType) => void
    selectionChanged: () => void
  }
  BackButton?: {
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

export function telegramApp() {
  return window.Telegram?.WebApp
}

export function initTelegram() {
  const app = telegramApp()
  if (!app) return

  app.ready()
  app.expand()
  app.setHeaderColor?.('#fff7e8')
  app.setBackgroundColor?.('#fff7e8')
}

function fallbackVibrate(pattern: number | number[]) {
  if ('vibrate' in navigator) navigator.vibrate(pattern)
}

export function hapticImpact(style: HapticStyle = 'light') {
  const haptics = telegramApp()?.HapticFeedback
  if (haptics) haptics.impactOccurred(style)
  else fallbackVibrate(style === 'heavy' ? 28 : style === 'medium' ? 18 : 10)
}

export function hapticNotification(type: NotificationType) {
  const haptics = telegramApp()?.HapticFeedback
  if (haptics) haptics.notificationOccurred(type)
  else fallbackVibrate(type === 'success' ? [10, 35, 12] : [25, 35, 25])
}

export function hapticSelection() {
  const haptics = telegramApp()?.HapticFeedback
  if (haptics) haptics.selectionChanged()
  else fallbackVibrate(8)
}
