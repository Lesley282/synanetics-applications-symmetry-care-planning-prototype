import checkCircle from '../../assets/check-circle.png'
import type { SectionId } from '../../types/carePlan'
import './SectionNav.scss'

const LABELS: Record<SectionId, string> = {
  consent: 'Consent',
  overview: 'Overview',
  respect: 'ReSPECT',
}

type SectionNavProps = {
  sections: SectionId[]
  active: SectionId
  onSelect: (id: SectionId) => void
}

export function SectionNav({ sections, active, onSelect }: SectionNavProps) {
  return (
    <nav className="section-nav" aria-label="Care plan sections">
      {sections.map((id) =>
        id === 'consent' ? (
          <div key={id} className="section-nav__item section-nav__item--readonly">
            <img src={checkCircle} alt="Consent given" className="section-nav__check" />
            {LABELS[id]}
          </div>
        ) : (
          <button
            key={id}
            type="button"
            className="section-nav__item"
            data-active={id === active}
            onClick={() => onSelect(id)}
          >
            {LABELS[id]}
          </button>
        ),
      )}
    </nav>
  )
}
