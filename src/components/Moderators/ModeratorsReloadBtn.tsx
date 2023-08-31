import { useModerators } from './Moderators'

export function ModeratorsReloadButton() {
  // Hooks -----------------------------------------------------------------------
  const { fetchModerators } = useModerators()

  // Constants -------------------------------------------------------------------
  const [, lang] = window.location.pathname.split('/')

  const texts = {
    fr: {
      reload: 'recharger',
    },
    en: {
      reload: 'reload',
    },
  }[lang]

  // View ------------------------------------------------------------------------
  return (
    <button onClick={fetchModerators} className="submit-button">
      {texts.reload}
    </button>
  )
}
