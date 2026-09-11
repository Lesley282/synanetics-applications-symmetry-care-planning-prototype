import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuIcon } from '@synanetics/syn-library'
import { useOutsideClick } from '../../lib/useOutsideClick'
import './AreaSwitcherMenu.scss'

const AREAS = [
  { label: 'Care planning', to: null, disabled: false },
  { label: 'Designer', to: null, disabled: true },
  { label: 'Analytics', to: '/analytics', disabled: false },
  { label: 'Patient audit', to: null, disabled: true },
  { label: 'Admin', to: null, disabled: true },
]

export function AreaSwitcherMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useOutsideClick(rootRef, () => setOpen(false), open)

  return (
    <div className="area-switcher" ref={rootRef}>
      <button
        type="button"
        className="utility-header__icon-btn"
        aria-label="Switch area"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon size={18} />
      </button>

      {open && (
        <ul className="area-switcher__menu" role="menu">
          {AREAS.map((area) => (
            <li key={area.label} role="none">
              <button
                type="button"
                role="menuitem"
                className="area-switcher__item"
                disabled={area.disabled}
                onClick={() => {
                  setOpen(false)
                  if (area.to) navigate(area.to)
                }}
              >
                {area.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
