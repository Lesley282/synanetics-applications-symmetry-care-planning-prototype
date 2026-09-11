import type { CarePlanSummary, OverviewFormState, PatientRecord, RespectFormState } from '../types/carePlan'

export const seedPatient: PatientRecord = {
  nhsNumber: '9658216913',
  firstName: 'Olive',
  preferredName: 'Olive',
  pronouns: 'she/her',
  surname: 'Rumble',
  age: 80,
  sex: 'Female',
}

export const seedPlans: CarePlanSummary[] = [
  {
    id: 'respect-v2',
    title: 'ReSPECT',
    group: 'active',
    version: 'v2',
    completeness: 'complete',
    hasUnsavedChanges: false,
    lastUpdated: '12 Aug 2025, 09:14',
    lastUpdatedBy: 'Dr. Amara Okafor',
  },
  {
    id: 'about-me-v1',
    title: 'About Me',
    group: 'active',
    version: 'v1',
    completeness: 'complete',
    hasUnsavedChanges: false,
    lastUpdated: '03 Jul 2025, 15:40',
    lastUpdatedBy: 'Joe Bloggs',
  },
  {
    id: 's117-aftercare',
    title: 'S117 after care',
    group: 'active',
    version: 'v1',
    completeness: 'partial',
    hasUnsavedChanges: true,
    lastUpdated: '02 Sep 2025, 11:02',
    lastUpdatedBy: 'Joe Bloggs',
  },
  {
    id: 'end-of-life-v2',
    title: 'End of Life',
    group: 'active',
    version: 'v2',
    completeness: 'partial',
    hasUnsavedChanges: true,
    lastUpdated: '28 Aug 2025, 16:21',
    lastUpdatedBy: 'Dr. Priya Shah',
  },
  {
    id: 'advance-care-plan',
    title: 'Advance Care Plan',
    group: 'personal-draft',
    version: 'draft',
    completeness: 'partial',
    hasUnsavedChanges: false,
    lastUpdated: '30 Aug 2025, 10:05',
    lastUpdatedBy: 'Joe Bloggs',
  },
  {
    id: 'respect-v3',
    title: 'ReSPECT',
    group: 'collaborative-draft',
    version: 'v3',
    completeness: 'partial',
    hasUnsavedChanges: true,
    lastUpdated: '10 Sep 2025, 08:47',
    lastUpdatedBy: 'Dr. Amara Okafor',
  },
]

export const seedOverview: OverviewFormState = {
  mostImportant: 'Staying in my own home for as long as possible, and being able to see my garden every day.',
  importantPeople: 'My daughter Jean, my neighbour Frank, and my cat Whiskey.',
  wellness: 'A good day starts with a cup of tea by the window. I like the radio on low in the background.',
}

export const seedRespect: RespectFormState = {
  date: '2025-08-12',
  preferredName: 'Olive',
  interpreterNeeded: false,
  summary:
    'Olive is a widowed 80-year-old with mild frailty and stable COPD. She wishes to remain at home and prioritises comfort over prolonged hospital treatment.',
  welfareProxy: 'yes',
  documents: {
    advanceDecision: true,
    lastingPowerOfAttorney: true,
    organDonorRegister: false,
    existingRespectForm: true,
    otherAdvanceCarePlan: false,
  },
  priorityScale: 4,
  priorityNotes: 'Comfort and staying at home matter more to Olive than extending life through intensive treatment.',
  wishesNotes: 'Prefers to avoid hospital admission where possible; happy to be treated at home or in a hospice.',
  clinicalRecommendation:
    'Attempt CPR is not recommended. Focus on symptom control and community-based treatment escalation.',
}
