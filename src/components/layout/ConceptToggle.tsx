import { Link } from 'react-router-dom'
import './ConceptToggle.scss'

type ConceptToggleProps = {
  active: 'A' | 'B'
  nhs: string
}

export function ConceptToggle({ active, nhs }: ConceptToggleProps) {
  return (
    <div className="concept-toggle" data-active={active}>
      <span className="concept-toggle__highlight" aria-hidden="true" />
      <Link to={`/concept-a?nhs=${nhs}`} className="concept-toggle__option" aria-current={active === 'A'}>
        Concept A
      </Link>
      <Link to={`/concept-b?nhs=${nhs}`} className="concept-toggle__option" aria-current={active === 'B'}>
        Concept B
      </Link>
    </div>
  )
}
