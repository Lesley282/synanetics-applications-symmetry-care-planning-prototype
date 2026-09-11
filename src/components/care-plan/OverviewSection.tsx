import { Alert, TextArea } from '@synanetics/syn-library'
import type { OverviewFormState } from '../../types/carePlan'
import './OverviewSection.scss'

const MAX_LENGTH = 2000

type OverviewSectionProps = {
  value: OverviewFormState
  onChange: (next: OverviewFormState) => void
}

export function OverviewSection({ value, onChange }: OverviewSectionProps) {
  return (
    <div className="overview-section">
      <Alert variant="warning">Snapshot autosave is not working right now please save changes.</Alert>

      <h2 className="overview-section__title">About Me</h2>
      <p className="overview-section__helper">
        <em>This helps everyone involved in your care understand what matters most to you.</em>
      </p>

      <TextArea
        label="What is most important to me"
        labelInfoText="Think about your daily routine, your home, and what a good day looks like for you."
        value={value.mostImportant}
        maxLength={MAX_LENGTH}
        onChange={(mostImportant) => onChange({ ...value, mostImportant })}
      />

      <TextArea
        label="People who are important to me"
        labelInfoText="Family, friends, carers, neighbours — anyone you'd want involved in decisions about your care."
        value={value.importantPeople}
        maxLength={MAX_LENGTH}
        onChange={(importantPeople) => onChange({ ...value, importantPeople })}
      />

      <TextArea
        label="My wellness"
        labelInfoText="What helps you feel well, comfortable, or at ease day to day."
        value={value.wellness}
        maxLength={MAX_LENGTH}
        onChange={(wellness) => onChange({ ...value, wellness })}
      />
    </div>
  )
}
