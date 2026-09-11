import { useRef, useState } from 'react'
import { Button } from '@synanetics/syn-library'
import { ChevronDownIcon } from '../icons'
import { useOutsideClick } from '../../lib/useOutsideClick'
import './SaveSplitButton.scss'

type SaveSplitButtonProps = {
  onSave: (group: 'personal-draft' | 'collaborative-draft') => void
}

export function SaveSplitButton({ onSave }: SaveSplitButtonProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  useOutsideClick(rootRef, () => setOpen(false), open)

  return (
    <div className="save-split-button" ref={rootRef}>
      <Button variant="primary" modifier="standard" size="small" onClick={() => onSave('personal-draft')}>
        Save
      </Button>
      <button
        type="button"
        className="save-split-button__chevron"
        aria-label="Save options"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <ChevronDownIcon size={14} />
      </button>
      {open && (
        <ul className="save-split-button__menu" role="menu">
          <li role="none">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onSave('personal-draft')
                setOpen(false)
              }}
            >
              Personal draft
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onSave('collaborative-draft')
                setOpen(false)
              }}
            >
              Collaborative draft
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
