import type { ReactNode } from 'react'
import { LogoutIcon } from '@synanetics/syn-library'
import logoIcon from '../../assets/symmetry-logo-icon.png'
import './UtilityHeader.scss'

type UtilityHeaderProps = {
  version: string
  center?: ReactNode
  rightIcons?: ReactNode
  userName: string
  onExit?: () => void
}

export function UtilityHeader({ version, center, rightIcons, userName, onExit }: UtilityHeaderProps) {
  return (
    <header className="utility-header">
      <div className="utility-header__left">
        <img src={logoIcon} alt="" className="utility-header__logo" />
        <span className="utility-header__wordmark">Symmetry</span>
        <span className="utility-header__divider" aria-hidden="true" />
        <span className="utility-header__powered">Powered by Synanetics</span>
        <span className="utility-header__divider" aria-hidden="true" />
        <span className="utility-header__version">v{version}</span>
      </div>

      {center && <div className="utility-header__center">{center}</div>}

      <div className="utility-header__right">
        {rightIcons}
        <span className="utility-header__username">{userName}</span>
        <button
          type="button"
          className="utility-header__icon-btn utility-header__icon-btn--borderless"
          aria-label="Exit"
          onClick={onExit}
        >
          <LogoutIcon size={18} />
        </button>
      </div>
    </header>
  )
}
