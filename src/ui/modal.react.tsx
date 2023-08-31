import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface ModalProps {
  children: (close: () => void) => React.ReactNode
  openButton?: (open: () => void) => React.ReactNode
  title?: string
}

export default function Modal({ title, children, openButton }: ModalProps) {
  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const openModal = () => setOpen(true)

  return (
    <>
      {openButton && openButton(openModal)}
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-red-950 bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-1 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-doom-bg border border-doom-bgLight text-left align-middle shadow-xl transition-all">
                  <header className="flex justify-between gap-2 p-2">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium text-doom-orange uppercase"
                    >
                      {title}
                    </Dialog.Title>
                    <button onClick={closeModal}>
                      <img src="/icons/cross.webp" alt="close" />
                    </button>
                  </header>
                  <div className="mt-2 px-4 pb-4">{children(closeModal)}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
