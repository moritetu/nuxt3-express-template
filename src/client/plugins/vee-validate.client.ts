import { localize, setLocale } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import AllRules from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'

export default defineNuxtPlugin((_nuxtApp) => {
  configure({
    generateMessage: localize({
      en,
      ja,
    }),
  })

  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule])
  })

  const runtimeConfig = useRuntimeConfig()
  setLocale(runtimeConfig.public.locale)
})
