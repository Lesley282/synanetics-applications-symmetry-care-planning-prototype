import { useState, type ReactNode } from 'react'
import { Modal, Button, Checkbox } from '@synanetics/syn-library'
import type { ModalSize } from '@synanetics/syn-library'
import './ConfirmModal.scss'

type ConfirmModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  primaryLabel: string
  onPrimary: () => void
  primaryModifier?: 'standard' | 'error'
  secondaryLabel?: string
  onSecondary?: () => void
  requireUnderstanding?: boolean
  hideSecondary?: boolean
  size?: ModalSize
}

export function ConfirmModal({
  isOpen,
  onClose,
  title,
  children,
  primaryLabel,
  onPrimary,
  primaryModifier = 'standard',
  secondaryLabel = 'Cancel',
  onSecondary,
  requireUnderstanding = false,
  hideSecondary = false,
  size = '1/4',
}: ConfirmModalProps) {
  const [understood, setUnderstood] = useState(false)
  const [shake, setShake] = useState(false)

  const handlePrimary = () => {
    if (requireUnderstanding && !understood) {
      setShake(true)
      window.setTimeout(() => setShake(false), 400)
      return
    }
    onPrimary()
    setUnderstood(false)
  }

  const handleSecondary = () => {
    onSecondary?.()
    onClose()
  }

  return (
    <Modal.Root isOpen={isOpen} isDismissable modalSize={size} onOpenChange={(open) => !open && onClose()}>
      <Modal.Header onClose={onClose}>{title}</Modal.Header>
      <Modal.Body col>
        <div className="confirm-modal__body">{children}</div>
        {requireUnderstanding && (
          <div className={`confirm-modal__checkbox${shake ? ' shake' : ''}`}>
            <Checkbox label="I understand" isSelected={understood} onChange={setUnderstood} />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="confirm-modal__footer">
        {!hideSecondary && (
          <Button variant="secondary" modifier="standard" size="small" onClick={handleSecondary}>
            {secondaryLabel}
          </Button>
        )}
        <Button variant="primary" modifier={primaryModifier} size="small" onClick={handlePrimary}>
          {primaryLabel}
        </Button>
      </Modal.Footer>
    </Modal.Root>
  )
}
