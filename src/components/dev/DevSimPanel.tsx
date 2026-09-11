import { useState } from 'react'
import './DevSimPanel.scss'

type DevSimTrigger = {
  label: string
  onClick: () => void
}

type DevSimPanelProps = {
  triggers: DevSimTrigger[]
}

export function DevSimPanel({ triggers }: DevSimPanelProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="dev-sim-panel">
      <button type="button" className="dev-sim-panel__toggle" onClick={() => setOpen((prev) => !prev)}>
        Dev sim
      </button>
      {open && (
        <div className="dev-sim-panel__body">
          <p className="dev-sim-panel__hint">Prototype-only testing aid — not shipped.</p>
          {triggers.map((trigger) => (
            <button key={trigger.label} type="button" className="dev-sim-panel__item" onClick={trigger.onClick}>
              {trigger.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
