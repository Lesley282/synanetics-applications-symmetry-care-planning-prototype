import { useMemo, useState } from 'react'
import { seedOverview, seedPlans, seedRespect } from '../data/seed'
import type { CarePlanSummary, OverviewFormState, RespectFormState, SectionId } from '../types/carePlan'
import { useAutosave } from '../lib/useAutosave'

export type ModalKey =
  'cancel' | 'discharge' | 'delete' | 'recover' | 'stale' | 'staleConflict' | 'templateMismatch' | null

export function useCarePlanEditor() {
  const [plans, setPlans] = useState<CarePlanSummary[]>(seedPlans)
  const [selectedPlanId, setSelectedPlanId] = useState(seedPlans[0].id)
  const [screenMode, setScreenMode] = useState<'plans' | 'edit'>('plans')
  const [activeNav, setActiveNav] = useState<SectionId>('overview')
  const [subscribed, setSubscribed] = useState(true)
  const [overview, setOverview] = useState<OverviewFormState>(seedOverview)
  const [respect, setRespect] = useState<RespectFormState>(seedRespect)
  const [activeModal, setActiveModal] = useState<ModalKey>(null)
  const { dirty, saveStatus, notifyChange, reset } = useAutosave()

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[0],
    [plans, selectedPlanId],
  )

  function selectPlan(id: string) {
    setSelectedPlanId(id)
    setScreenMode('plans')
  }

  function enterEdit() {
    setScreenMode('edit')
    setActiveNav('overview')
  }

  function updateOverview(next: OverviewFormState) {
    setOverview(next)
    notifyChange()
  }

  function updateRespect(next: RespectFormState) {
    setRespect(next)
    notifyChange()
  }

  function requestModal(key: ModalKey) {
    setActiveModal(key)
  }

  function closeModal() {
    setActiveModal(null)
  }

  function discardChanges() {
    setOverview(seedOverview)
    setRespect(seedRespect)
    reset()
    setScreenMode('plans')
    setActiveModal(null)
  }

  function dischargePlan() {
    setPlans((prev) => prev.filter((plan) => plan.id !== selectedPlanId))
    reset()
    setScreenMode('plans')
    setActiveModal(null)
  }

  function deleteDraft() {
    setPlans((prev) => prev.filter((plan) => plan.id !== selectedPlanId))
    reset()
    setScreenMode('plans')
    setActiveModal(null)
  }

  function publish() {
    setPlans((prev) => prev.map((plan) => (plan.id === selectedPlanId ? { ...plan, hasUnsavedChanges: false } : plan)))
    reset()
    setScreenMode('plans')
    setActiveModal(null)
  }

  function saveAs(group: 'personal-draft' | 'collaborative-draft') {
    setPlans((prev) =>
      prev.map((plan) => (plan.id === selectedPlanId ? { ...plan, group, hasUnsavedChanges: true } : plan)),
    )
  }

  return {
    plans,
    selectedPlan,
    selectedPlanId,
    selectPlan,
    screenMode,
    setScreenMode,
    enterEdit,
    activeNav,
    setActiveNav,
    subscribed,
    setSubscribed,
    overview,
    updateOverview,
    respect,
    updateRespect,
    dirty,
    saveStatus,
    activeModal,
    requestModal,
    closeModal,
    discardChanges,
    dischargePlan,
    deleteDraft,
    publish,
    saveAs,
  }
}

export type CarePlanEditor = ReturnType<typeof useCarePlanEditor>
