import Modal from '@/ui/modal.react'
import { Turnstile } from '@marsidev/react-turnstile'
import { useRef, useState } from 'react'

interface SubmitDeviceModalProps {
  turnstileKey: string
}

export default function SubmitDeviceModal({
  turnstileKey,
}: SubmitDeviceModalProps) {
  // State ---------------------------------------------------------------------
  const [device, setDevice] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Hooks ---------------------------------------------------------------------
  const formRef = useRef()

  // Constants -----------------------------------------------------------------
  const [, lang] = window.location.pathname.split('/')

  const texts = {
    fr: {
      button: 'soumettre une machine',
      placeholder: "nom d'une machine",
      submit: 'envoyer',
      cancel: 'annuler',
      turnstileError: 'erreur de vérification',
      machineError:
        'Une erreur est survenue lors de la soumission de la machine',
      success: 'Machine soumise avec succès',
      'device-already-exist': 'Cette machine existe déjà',
      'no-device-input': 'Veuillez entrer un nom de machine',
    },
    en: {
      button: 'submit a device',
      placeholder: 'device name',
      submit: 'submit',
      cancel: 'cancel',
      turnstileError: 'verification error',
      machineError: 'An error occurred while submitting the machine',
      success: 'Machine submitted successfully',
      'device-already-exist': 'This machine already exists',
      'no-device-input': 'Please enter a device name',
    },
  }[lang]

  // Handlers ------------------------------------------------------------------
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(formRef.current)
    const token = formData.get('cf-turnstile-response')
    const res = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'content-type': 'application/json',
      },
    })
    if (!res.ok) {
      setLoading(false)
      console.log(res)
      setError(texts.turnstileError)
      return
    }

    const resMachine = await fetch('/api/devices/proposal', {
      method: 'POST',
      body: JSON.stringify({ device }),
      headers: {
        'content-type': 'application/json',
      },
    })
    setLoading(false)
    if (!resMachine.ok) {
      const { error: errRes } = await resMachine.json()

      const err = texts[errRes] || errRes
      setError(err)
      return
    }

    setDevice('')
    setSuccess(texts.success)
  }

  const handleFocus = () => {
    setDevice('')
    setError('')
    setSuccess('')
  }

  // Render --------------------------------------------------------------------
  return (
    <Modal
      title={texts.button}
      openButton={(open) => (
        <button onClick={open} className="text-xs">
          {texts.button}
        </button>
      )}
    >
      {(close) => (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder={texts.placeholder}
            value={device}
            onFocus={handleFocus}
            onChange={(e) => setDevice(e.target.value)}
            className="input"
          />
          <div className="flex w-full justify-center">
            <Turnstile
              siteKey={turnstileKey}
              onSuccess={() => setDisabled(false)}
            />
          </div>
          <div className="flex w-full justify-center">
            {error && <span className="text-doom-orange"> {error} </span>}
            {success && <span className="text-doom-green"> {success} </span>}
          </div>
          <div className="flex gap-2 justify-between">
            <button type="reset" onClick={close} className="cancel-button">
              {texts.cancel}
            </button>
            <button
              type="submit"
              disabled={disabled || loading}
              className="submit-button"
            >
              {loading ? '...' : texts.submit}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}
