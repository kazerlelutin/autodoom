import { useState } from 'react'
import { useModerators } from './Moderators'

export function ModeratorCreateForm() {
  // Hooks -----------------------------------------------------------------------
  const { loading, create } = useModerators()

  // Constants -------------------------------------------------------------------
  const [, lang] = window.location.pathname.split('/')
  const [form, setForm] = useState({
    name: '',
    email: '',
    lang: 'fr',
  })

  const texts = {
    fr: {
      name: 'Nom',
      email: 'Email',
      lang: 'Langue',
      submit: 'Ajouter un modérateur',
      cancel: 'Annuler',
      en: 'Anglais',
      fr: 'Français',
    },
    en: {
      name: 'Name',
      email: 'Email',
      lang: 'Language',
      submit: 'Add a moderator',
      cancel: 'Cancel',
      en: 'English',
      fr: 'French',
    },
  }[lang]

  // Handlers ---------------------------------------------------------------------
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    create(form)
    setForm({
      name: '',
      email: '',
      lang: 'fr',
    })
  }

  // Render -----------------------------------------------------------------------
  return (
    <form
      className="flex gap-2 items-center justify-center border rounded border-doom-gray p-2 text-sm"
      onSubmit={handleCreate}
    >
      <div className="flex  gap-1 items-center">
        <label>{texts.name}</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input"
        />
      </div>
      <div className="flex items-center gap-1">
        <label>{texts.email}</label>
        <input
          type="text"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input"
        />
      </div>
      <div className="flex items-center gap-1">
        <label>{texts.lang}</label>
        <select
          value={form.lang}
          onChange={(e) => setForm({ ...form, lang: e.target.value })}
          className="input"
        >
          <option value="fr">{texts.fr}</option>
          <option value="en">{texts.en}</option>
        </select>
      </div>
      <div className="flex gap-2 justify-between ml-3">
        <button
          type="reset"
          className="cancel-button"
          onClick={() =>
            setForm({
              name: '',
              email: '',
              lang: 'fr',
            })
          }
        >
          {texts.cancel}
        </button>
        <button
          type="submit"
          className="submit-button disabled:opacity-50"
          disabled={loading}
        >
          {texts.submit}
        </button>
      </div>
    </form>
  )
}
