export type PlanGroup = 'active' | 'personal-draft' | 'collaborative-draft'
export type Completeness = 'complete' | 'partial' | 'empty'
export type SaveStatus = 'idle' | 'saving' | 'saved'
export type SectionId = 'consent' | 'overview' | 'respect'

export type CarePlanSummary = {
  id: string
  title: string
  group: PlanGroup
  version: string
  completeness: Completeness
  hasUnsavedChanges: boolean
  lastUpdated: string
  lastUpdatedBy: string
}

export type RespectDocuments = {
  advanceDecision: boolean
  lastingPowerOfAttorney: boolean
  organDonorRegister: boolean
  existingRespectForm: boolean
  otherAdvanceCarePlan: boolean
}

export type RespectFormState = {
  date: string
  preferredName: string
  interpreterNeeded: boolean
  summary: string
  welfareProxy: 'yes' | 'no' | null
  documents: RespectDocuments
  priorityScale: number
  priorityNotes: string
  wishesNotes: string
  clinicalRecommendation: string
}

export type OverviewFormState = {
  mostImportant: string
  importantPeople: string
  wellness: string
}

export type PatientRecord = {
  nhsNumber: string
  firstName: string
  preferredName: string
  pronouns: string
  surname: string
  age: number
  sex: string
}
