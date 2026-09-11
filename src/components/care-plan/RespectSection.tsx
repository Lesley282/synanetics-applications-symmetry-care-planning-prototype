import {
  AccordionButton,
  AccordionContent,
  AccordionGroup,
  AccordionHeader,
  AccordionItem,
  Checkbox,
  DateField,
  RadioGroup,
  Slider,
  TextArea,
  TextField,
} from '@synanetics/syn-library'
import type { RespectDocuments, RespectFormState } from '../../types/carePlan'
import './RespectSection.scss'

const PRIORITY_LABELS = ['0%', '20%', '40%', '60%', '80%', '100%']

const DOCUMENT_LABELS: Record<keyof RespectDocuments, string> = {
  advanceDecision: 'Advance decision to refuse treatment',
  lastingPowerOfAttorney: 'Lasting power of attorney (health & welfare)',
  organDonorRegister: 'On the organ donor register',
  existingRespectForm: 'Existing ReSPECT form',
  otherAdvanceCarePlan: 'Other advance care plan on file',
}

type RespectSectionProps = {
  value: RespectFormState
  onChange: (next: RespectFormState) => void
}

export function RespectSection({ value, onChange }: RespectSectionProps) {
  return (
    <div className="respect-section">
      <section className="respect-section__block">
        <header className="respect-section__header">1. Personal details</header>
        <div className="respect-section__grid">
          <DateField label="Date" value={value.date} onChange={(date) => onChange({ ...value, date: date ?? '' })} />
          <TextField
            label="Preferred name"
            value={value.preferredName}
            onChange={(preferredName) => onChange({ ...value, preferredName })}
          />
        </div>
        <Checkbox
          label="Interpreter needed"
          isSelected={value.interpreterNeeded}
          onChange={(interpreterNeeded) => onChange({ ...value, interpreterNeeded })}
        />
      </section>

      <section className="respect-section__block">
        <header className="respect-section__header">2. Summary &amp; documentation</header>
        <TextArea label="Summary" value={value.summary} onChange={(summary) => onChange({ ...value, summary })} />

        <RadioGroup.Root
          label="Welfare proxy in place?"
          value={value.welfareProxy ?? undefined}
          onChange={(welfareProxy) => onChange({ ...value, welfareProxy: welfareProxy as 'yes' | 'no' })}
        >
          <RadioGroup.Item value="yes">Yes</RadioGroup.Item>
          <RadioGroup.Item value="no">No</RadioGroup.Item>
        </RadioGroup.Root>

        <div className="respect-section__documents">
          {(Object.keys(DOCUMENT_LABELS) as (keyof RespectDocuments)[]).map((key) => (
            <Checkbox
              key={key}
              label={DOCUMENT_LABELS[key]}
              isSelected={value.documents[key]}
              onChange={(checked) => onChange({ ...value, documents: { ...value.documents, [key]: checked } })}
            />
          ))}
        </div>
      </section>

      <AccordionGroup allowsMultipleExpanded defaultExpandedKeys={['priority']}>
        <AccordionItem id="priority" className="respect-section__block">
          <AccordionHeader>
            <AccordionButton className="respect-section__header">3. What matters most to you</AccordionButton>
          </AccordionHeader>
          <AccordionContent>
            <Slider
              label="What is most important to you?"
              minValue={0}
              maxValue={5}
              value={value.priorityScale}
              showLabelAndValue
              onChange={(priorityScale) => onChange({ ...value, priorityScale })}
            />
            <p className="respect-section__slider-value">{PRIORITY_LABELS[value.priorityScale]}</p>
            <TextArea
              label="What matters most, in their own words"
              value={value.priorityNotes}
              onChange={(priorityNotes) => onChange({ ...value, priorityNotes })}
            />
            <TextArea
              label="Wishes and preferences"
              value={value.wishesNotes}
              onChange={(wishesNotes) => onChange({ ...value, wishesNotes })}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="recommendation" className="respect-section__block">
          <AccordionHeader>
            <AccordionButton className="respect-section__header">4. Clinical recommendation</AccordionButton>
          </AccordionHeader>
          <AccordionContent>
            <TextArea
              label="Clinical recommendation"
              value={value.clinicalRecommendation}
              onChange={(clinicalRecommendation) => onChange({ ...value, clinicalRecommendation })}
            />
          </AccordionContent>
        </AccordionItem>
      </AccordionGroup>
    </div>
  )
}
