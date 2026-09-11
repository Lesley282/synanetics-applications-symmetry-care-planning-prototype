import type { PatientRecord } from '../../types/carePlan'
import { formatNhsNumber } from '../../lib/nhsNumber'
import './PatientBanner.scss'

type PatientBannerProps = {
  patient: PatientRecord
  nhsFirst?: boolean
  onChangePatient?: () => void
}

export function PatientBanner({ patient, nhsFirst, onChangePatient }: PatientBannerProps) {
  const nameBlock = (
    <span>
      {patient.surname.toUpperCase()}, {patient.firstName} ({patient.preferredName}, {patient.pronouns})
    </span>
  )
  const nhsBlock = <span>{formatNhsNumber(patient.nhsNumber)}</span>

  return (
    <div className="patient-banner">
      <div className="patient-banner__details">
        {nhsFirst ? nhsBlock : nameBlock}
        <span className="patient-banner__divider" aria-hidden="true" />
        {nhsFirst ? nameBlock : nhsBlock}
        <span className="patient-banner__divider" aria-hidden="true" />
        <span>{patient.age}y</span>
        <span className="patient-banner__divider" aria-hidden="true" />
        <span>{patient.sex}</span>
      </div>
      <button type="button" className="patient-banner__change" onClick={onChangePatient}>
        Change patient
      </button>
    </div>
  )
}
