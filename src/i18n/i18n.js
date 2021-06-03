import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { I18nManager } from 'react-native'
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources = {
  en: {
    translation: {
      'Welcome back.': 'Welcome to React and react-i18next',
      'Welcome back.': 'Welcome to React and react-i18next',
    },
  },
  he: {
    translation: {
      'Welcome back.': 'ברוכים הבאים חזרה',
      'Welcome to the hashmalie App ': 'ברוכים הבאים לאפליקציה',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: I18nManager.isRTL ? 'he' : 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
