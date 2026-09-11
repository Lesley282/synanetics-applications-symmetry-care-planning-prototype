import type { CarePlanSummary, OverviewFormState, RespectFormState } from '../../types/carePlan'
import './PlanPreview.scss'

function ReadOnlyField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="plan-preview__field">
      <span className="plan-preview__field-label">{label}</span>
      {value ? (
        <p className="plan-preview__field-value">{value}</p>
      ) : (
        <p className="plan-preview__field-value plan-preview__field-value--empty">Not provided</p>
      )}
    </div>
  )
}

type PlanPreviewProps = {
  plan: CarePlanSummary
  overview: OverviewFormState
  respect: RespectFormState
}

export function PlanPreview({ plan, overview, respect }: PlanPreviewProps) {
  if (plan.title === 'About Me') {
    return (
      <div className="plan-preview">
        <ReadOnlyField label="What is most important to me" value={overview.mostImportant} />
        <ReadOnlyField label="People who are important to me" value={overview.importantPeople} />
        <ReadOnlyField label="My wellness" value={overview.wellness} />
      </div>
    )
  }

  if (plan.title === 'ReSPECT') {
    return (
      <div className="plan-preview">
        <section className="plan-preview__section">
          <header className="plan-preview__section-header">1. Personal details</header>
          <ReadOnlyField label="Date" value={respect.date} />
          <ReadOnlyField label="Preferred name" value={respect.preferredName} />
          <ReadOnlyField label="Interpreter needed" value={respect.interpreterNeeded ? 'Yes' : 'No'} />
        </section>
        <section className="plan-preview__section">
          <header className="plan-preview__section-header">2. Summary &amp; documentation</header>
          <ReadOnlyField label="Summary" value={respect.summary} />
          <ReadOnlyField
            label="Welfare proxy in place?"
            value={respect.welfareProxy ? (respect.welfareProxy === 'yes' ? 'Yes' : 'No') : undefined}
          />
        </section>
        <section className="plan-preview__section">
          <header className="plan-preview__section-header">3. What matters most to you</header>
          <ReadOnlyField label="What matters most, in their own words" value={respect.priorityNotes} />
          <ReadOnlyField label="Wishes and preferences" value={respect.wishesNotes} />
        </section>
        <section className="plan-preview__section">
          <header className="plan-preview__section-header">4. Clinical recommendation</header>
          <ReadOnlyField label="Clinical recommendation" value={respect.clinicalRecommendation} />
        </section>
      </div>
    )
  }

  return (
    <div className="plan-preview">
      <ReadOnlyField label={plan.title} />
    </div>
  )
}
