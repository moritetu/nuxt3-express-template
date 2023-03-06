/* eslint-disable no-var */
declare var createUnityInstance: any

// window.xxx
interface Window {
  $app: Record<string, any>
}
declare var window: Window

declare module 'vue3-emoji-picker'
