import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Switch, Tooltip } from '@synanetics/syn-library'
import { UtilityHeader } from '../components/layout/UtilityHeader'
import { ConceptToggle } from '../components/layout/ConceptToggle'
import { AreaSwitcherMenu } from '../components/layout/AreaSwitcherMenu'
import { PatientBanner } from '../components/layout/PatientBanner'
import { InDraftBadge, SaveStatusBadge, CompletenessIcon } from '../components/status/StatusPill'
import { SectionNav } from '../components/care-plan/SectionNav'
import { OverviewSection } from '../components/care-plan/OverviewSection'
import { RespectSection } from '../components/care-plan/RespectSection'
import { PlanPreview } from '../components/care-plan/PlanPreview'
import { SaveSplitButton } from '../components/care-plan/SaveSplitButton'
import { ConfirmModal } from '../components/modals/ConfirmModal'
import { DevSimPanel } from '../components/dev/DevSimPanel'
import { BellIcon, HistoryIcon } from '../components/icons'
import { useNhsParam } from '../hooks/useNhsParam'
import { useCarePlanEditor } from '../hooks/useCarePlanEditor'
import { seedPatient } from '../data/seed'
import './ConceptBPage.scss'

export function ConceptBPage() {
  const nhs = useNhsParam()
  const navigate = useNavigate()
  const editor = useCarePlanEditor()
  const [showPublished, setShowPublished] = useState(true)

  if (!nhs) return null

  const published = editor.plans.filter((plan) => plan.group === 'active')
  const privateDrafts = editor.plans.filter((plan) => plan.group === 'personal-draft')
  const collaborativeDrafts = editor.plans.filter((plan) => plan.group === 'collaborative-draft')
  const inProgressCount = privateDrafts.length + collaborativeDrafts.length

  return (
    <div className="concept-b-page">
      <UtilityHeader
        version="8.01"
        center={<ConceptToggle active="B" nhs={nhs} />}
        userName="Joe Bloggs"
        onExit={() => navigate('/')}
        rightIcons={
          <>
            <button type="button" className="utility-header__icon-btn" aria-label="Notifications">
              <BellIcon size={18} />
            </button>
            <AreaSwitcherMenu />
          </>
        }
      />
      <PatientBanner patient={seedPatient} nhsFirst onChangePatient={() => navigate('/')} />

      {editor.screenMode === 'plans' ? (
        <div className="concept-b-page__body">
          <aside className="care-plans-sidebar">
            <div className="care-plans-sidebar__header">
              <h2>Care plans</h2>
              <Button variant="tertiary" modifier="standard" size="small">
                + Create
              </Button>
            </div>

            <div className="care-plans-sidebar__in-progress">
              <Switch isSelected={showPublished} onChange={setShowPublished}>
                In progress
              </Switch>
              <span className="care-plans-sidebar__count" aria-label={`${inProgressCount} in-progress plans`}>
                {inProgressCount}
              </span>
              <Tooltip content="Care plans we detect are in progress">
                <span className="care-plans-sidebar__info" aria-hidden="true">
                  i
                </span>
              </Tooltip>
            </div>

            <div className="care-plans-sidebar__published" data-collapsed={!showPublished}>
              <div className="care-plans-sidebar__published-inner">
                {published.map((plan, index) => (
                  <button
                    key={plan.id}
                    type="button"
                    className="care-row"
                    data-selected={plan.id === editor.selectedPlanId}
                    data-divider={index === published.length - 1}
                    onClick={() => editor.selectPlan(plan.id)}
                  >
                    <CompletenessIcon completeness={plan.completeness} />
                    <span className="care-row__title">
                      {plan.title} ({plan.version})
                    </span>
                    {plan.hasUnsavedChanges && <span className="care-row__alert-dot" aria-label="Unsaved changes" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="care-plans-sidebar__section-label">Private drafts</div>
            {privateDrafts.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className="care-row"
                data-selected={plan.id === editor.selectedPlanId}
                onClick={() => editor.selectPlan(plan.id)}
              >
                <CompletenessIcon completeness={plan.completeness} />
                <span className="care-row__title">{plan.title}</span>
                {plan.hasUnsavedChanges && <span className="care-row__alert-dot" aria-label="Unsaved changes" />}
              </button>
            ))}

            <div className="care-plans-sidebar__section-label">Collaborative</div>
            {collaborativeDrafts.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className="care-row"
                data-selected={plan.id === editor.selectedPlanId}
                onClick={() => editor.selectPlan(plan.id)}
              >
                <CompletenessIcon completeness={plan.completeness} />
                <span className="care-row__title">
                  {plan.title} ({plan.version})
                </span>
                {plan.hasUnsavedChanges && <span className="care-row__alert-dot" aria-label="Unsaved changes" />}
              </button>
            ))}
          </aside>

          <section className="plan-content-b">
            <div className="plan-content-b__sticky-bar">
              <span className="plan-content-b__title">{editor.selectedPlan.title}</span>
              <span className="plan-content-b__divider" />
              <span className="plan-content-b__version">{editor.selectedPlan.version}</span>
              <span className="plan-content-b__timestamp">{editor.selectedPlan.lastUpdated}</span>
              <span className="plan-content-b__divider" />
              {editor.selectedPlan.group !== 'active' ? (
                <SaveStatusBadge status={editor.saveStatus} startedBy="Joe Bloggs" />
              ) : (
                <InDraftBadge />
              )}
              <span className="plan-content-b__divider" />
              <Button variant="secondary" modifier="standard" size="small">
                <HistoryIcon size={14} /> History
              </Button>

              <div className="plan-content-b__right">
                <Switch isSelected={editor.subscribed} onChange={editor.setSubscribed}>
                  Subscribed
                </Switch>
                <Button variant="primary" modifier="standard" size="small" onClick={editor.enterEdit}>
                  Edit
                </Button>
                <Button
                  variant="primary"
                  modifier="standard"
                  size="small"
                  isDisabled={!editor.dirty}
                  onClick={editor.publish}
                >
                  Publish
                </Button>
              </div>
            </div>

            <div className="plan-content-b__preview-card">
              <PlanPreview plan={editor.selectedPlan} overview={editor.overview} respect={editor.respect} />
            </div>
          </section>
        </div>
      ) : (
        <div className="edit-mode">
          <div className="edit-mode__subheader">
            <div className="edit-mode__left">
              <Tooltip content="We will discard this session's autosave.">
                <Button
                  variant="secondary"
                  modifier="standard"
                  size="small"
                  onClick={() => editor.requestModal('cancel')}
                >
                  Cancel
                </Button>
              </Tooltip>
              <Button
                variant="secondary"
                modifier="error"
                size="small"
                onClick={() => editor.requestModal('discharge')}
              >
                Discharge
              </Button>
              <Button variant="secondary" modifier="error" size="small" onClick={() => editor.requestModal('delete')}>
                Delete draft
              </Button>
            </div>
            <div className="edit-mode__center">
              <SaveStatusBadge
                status={editor.saveStatus}
                startedBy="Joe Bloggs"
                startedAt={editor.selectedPlan.lastUpdated}
              />
            </div>
            <div className="edit-mode__right">
              <Switch isSelected={editor.subscribed} onChange={editor.setSubscribed}>
                Subscribed
              </Switch>
              <SaveSplitButton onSave={editor.saveAs} />
              <Button
                variant="primary"
                modifier="standard"
                size="small"
                isDisabled={!editor.dirty}
                onClick={editor.publish}
              >
                Publish
              </Button>
            </div>
          </div>

          <div className="edit-mode__body">
            <SectionNav sections={['overview', 'respect']} active={editor.activeNav} onSelect={editor.setActiveNav} />
            <div className="edit-mode__content">
              {editor.activeNav === 'overview' && (
                <OverviewSection value={editor.overview} onChange={editor.updateOverview} />
              )}
              {editor.activeNav === 'respect' && (
                <RespectSection value={editor.respect} onChange={editor.updateRespect} />
              )}
            </div>
          </div>
        </div>
      )}

      <DevSimPanel
        triggers={[
          { label: 'Simulate crash recovery', onClick: () => editor.requestModal('recover') },
          { label: 'Simulate stale draft', onClick: () => editor.requestModal('stale') },
          { label: 'Simulate stale draft (conflict)', onClick: () => editor.requestModal('staleConflict') },
          { label: 'Simulate template mismatch', onClick: () => editor.requestModal('templateMismatch') },
        ]}
      />

      <ConfirmModal
        isOpen={editor.activeModal === 'cancel'}
        onClose={editor.closeModal}
        title="Leave without saving?"
        primaryLabel="Discard changes"
        primaryModifier="error"
        secondaryLabel="Keep editing"
        onPrimary={editor.discardChanges}
        requireUnderstanding
      >
        You have unsaved changes in this session. Leaving now will discard your autosaved snapshot.
      </ConfirmModal>

      <ConfirmModal
        isOpen={editor.activeModal === 'discharge'}
        onClose={editor.closeModal}
        title="Discharge this care plan?"
        primaryLabel="Discharge"
        primaryModifier="error"
        secondaryLabel="Cancel"
        onPrimary={editor.dischargePlan}
        requireUnderstanding
      >
        This will end this care plan for the patient. This action cannot be undone.
      </ConfirmModal>

      <ConfirmModal
        isOpen={editor.activeModal === 'delete'}
        onClose={editor.closeModal}
        title="Delete this draft?"
        primaryLabel="Delete draft"
        primaryModifier="error"
        secondaryLabel="Cancel"
        onPrimary={editor.deleteDraft}
        requireUnderstanding
      >
        This draft and all its content will be permanently deleted.
      </ConfirmModal>

      <ConfirmModal
        isOpen={editor.activeModal === 'recover'}
        onClose={editor.closeModal}
        title="Restore unsaved work?"
        primaryLabel="Discard"
        primaryModifier="error"
        secondaryLabel="Restore"
        onPrimary={editor.closeModal}
        onSecondary={editor.enterEdit}
        requireUnderstanding
        size="1/2"
      >
        It looks like your last session ended unexpectedly. We found an autosaved snapshot from that session — would you
        like to restore it, or discard it and start fresh?
      </ConfirmModal>

      <ConfirmModal
        isOpen={editor.activeModal === 'stale'}
        onClose={editor.closeModal}
        title="Resume your draft?"
        primaryLabel="Discard"
        primaryModifier="error"
        secondaryLabel="Resume draft"
        onPrimary={editor.closeModal}
        onSecondary={editor.enterEdit}
        requireUnderstanding
        size="1/2"
      >
        You have a draft in progress for this care plan from a previous visit. Resume where you left off, or discard it
        and start over.
      </ConfirmModal>

      <ConfirmModal
        isOpen={editor.activeModal === 'staleConflict'}
        onClose={editor.closeModal}
        title="This draft has changed"
        primaryLabel="Discard my draft"
        primaryModifier="error"
        secondaryLabel="Resume anyway"
        onPrimary={editor.closeModal}
        onSecondary={editor.enterEdit}
        requireUnderstanding
        size="1/2"
      >
        Someone else has also updated this care plan since you started your draft. Resuming may overwrite their changes,
        or you can discard your draft and start from the latest version.
      </ConfirmModal>

      <ConfirmModal
        isOpen={editor.activeModal === 'templateMismatch'}
        onClose={editor.closeModal}
        title="Template has been updated"
        primaryLabel="OK, got it"
        onPrimary={editor.closeModal}
        hideSecondary
        size="1/2"
      >
        The ReSPECT template has changed since this draft was started. Some fields may need reviewing before you
        publish.
      </ConfirmModal>
    </div>
  )
}
