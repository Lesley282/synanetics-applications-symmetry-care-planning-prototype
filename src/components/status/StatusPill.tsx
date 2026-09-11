import { Badge, Tooltip } from '@synanetics/syn-library'
import inDraftIcon from '../../assets/in-draft-icon.svg'
import completenessComplete from '../../assets/completeness-complete.svg'
import completenessPartial from '../../assets/completeness-icon.svg'
import completenessEmpty from '../../assets/completeness-empty.svg'
import { CheckCircleIcon, DotIcon } from '../icons'
import type { Completeness, SaveStatus } from '../../types/carePlan'
import './StatusPill.scss'

export function ActiveBadge() {
  return (
    <Badge variant="status-red" filled size="sm">
      ACTIVE
    </Badge>
  )
}

export function InDraftBadge({ startedBy, startedAt }: { startedBy?: string; startedAt?: string }) {
  const pill = (
    <Badge variant="status-yellow" filled size="sm" className="status-pill--in-draft">
      <img src={inDraftIcon} alt="" className="status-pill__icon" />
      In draft
    </Badge>
  )
  if (!startedBy) return pill
  return <Tooltip content={`Started by ${startedBy}${startedAt ? ` on ${startedAt}` : ''}`}>{pill}</Tooltip>
}

export function SaveStatusBadge({
  status,
  startedBy,
  startedAt,
}: {
  status: SaveStatus
  startedBy?: string
  startedAt?: string
}) {
  if (status === 'saving') {
    return (
      <Badge variant="status-grey" filled size="sm" className="status-pill--saving">
        <DotIcon size={8} className="status-pill__pulse" />
        Saving snapshot…
      </Badge>
    )
  }
  if (status === 'saved') {
    return (
      <Tooltip content="This is a private snapshot — it hasn't been shared or published.">
        <Badge variant="status-grey" filled size="sm">
          <CheckCircleIcon size={14} />
          Saved session snapshot
        </Badge>
      </Tooltip>
    )
  }
  return <InDraftBadge startedBy={startedBy} startedAt={startedAt} />
}

export function CompletenessIcon({ completeness }: { completeness: Completeness }) {
  const src =
    completeness === 'complete'
      ? completenessComplete
      : completeness === 'partial'
        ? completenessPartial
        : completenessEmpty
  return <img src={src} alt={`${completeness} plan`} className="status-pill__completeness" />
}
