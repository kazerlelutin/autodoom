import { useState } from 'react'
import { useModerators } from './Moderators'

export function ModeratorList() {
  // Hooks -----------------------------------------------------------------------
  const { moderators, loading, del } = useModerators()

  // States -----------------------------------------------------------------------
  const [sure, setSure] = useState('')

  // Constants -------------------------------------------------------------------
  const [, lang] = window.location.pathname.split('/')

  const texts = {
    fr: {
      noModerators: 'Aucun modérateur',
      delete: 'Supprimer',
      sure: 'Confirmer',
      cancel: 'Annuler',
      confirm: 'Confirmer la suppression ?',
    },
    en: {
      noModerators: 'No moderators',
      delete: 'Delete',
      sure: 'Confirm',
      cancel: 'Cancel',
      confirm: 'Confirm deletion ?',
    },
  }[lang]

  // Handlers ---------------------------------------------------------------------

  const handleDelete = (id: string) => {
    if (sure !== id) {
      setSure(id)
      return
    }
    if (sure === id) del(id)
  }
  // Render -----------------------------------------------------------------------
  return (
    <>
      <div className="flex justify-center flex-col items-center gap-3">
        {loading && <div>...</div>}
        {moderators.length === 0 && !loading && (
          <div className="rounded p-1 bg-doom-red text-doom-text">
            {texts.noModerators}
          </div>
        )}

        <div className="max-w-lg flex flex-col gap-4">
          {moderators.map((moderator) => (
            <div
              key={moderator.id}
              className="flex justify-between items-center gap-5"
            >
              <div className="flex gap-1">
                <div>
                  <span className="text-doom-orange uppercase">
                    {moderator.name}
                  </span>{' '}
                  ({moderator.lang})
                </div>
                <div
                  className={
                    sure === moderator.id ? 'text-doom-red' : 'text-doom-yellow'
                  }
                >
                  {moderator.email}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {sure === moderator.id && (
                  <div className="text-xs text-center">{texts.confirm}</div>
                )}
                <div className="flex gap-2">
                  {sure === moderator.id && (
                    <button
                      className={
                        sure === moderator.id
                          ? 'cancel-button'
                          : 'submit-button'
                      }
                      onClick={() => setSure('')}
                    >
                      {texts.cancel}
                    </button>
                  )}
                  <button
                    disabled={loading}
                    className={
                      sure === moderator.id
                        ? 'submit-button disabled:opacity-50'
                        : 'cancel-button'
                    }
                    onClick={() => handleDelete(moderator.id)}
                  >
                    {sure === moderator.id ? texts.sure : texts.delete}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
