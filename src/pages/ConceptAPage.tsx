import { useNavigate } from 'react-router-dom'
import { BackIcon, Button, Switch, Tooltip } from '@synanetics/syn-library'
import { UtilityHeader } from '../components/layout/UtilityHeader'
import { ConceptToggle } from '../components/layout/ConceptToggle'
import { AreaSwitcherMenu } from '../components/layout/AreaSwitcherMenu'
import { PatientBanner } from '../components/layout/PatientBanner'
import { ActiveBadge, InDraftBadge, SaveStatusBadge } from '../components/status/StatusPill'
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
import './ConceptAPage.scss'

export function ConceptAPage() {
  const nhs = useNhsParam()
  const navigate = useNavigate()
  const editor = useCarePlanEditor()

  if (!nhs) return null

  const activePlans = editor.plans.filter((plan) => plan.group === 'active')
  const personalDrafts = editor.plans.filter((plan) => plan.group === 'personal-draft')
  const collaborativeDrafts = editor.plans.filter((plan) => plan.group === 'collaborative-draft')

  return (
    <div className="concept-a-page">
      <UtilityHeader
        version="8.01"
        center={<ConceptToggle active="A" nhs={nhs} />}
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
      <PatientBanner patient={seedPatient} onChangePatient={() => navigate('/')} />

      {editor.screenMode === 'plans' ? (
        <div className="concept-a-page__body">
          <aside className="plans-sidebar">
            <div className="plans-sidebar__header">
              <h2>Active plans</h2>
              <Button variant="primary" modifier="standard" size="small">
                + Create
              </Button>
            </div>

            {activePlans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className="plans-sidebar__row"
                data-selected={plan.id === editor.selectedPlanId}
                onClick={() => editor.selectPlan(plan.id)}
              >
                <span className="plans-sidebar__row-title">
                  {plan.title} ({plan.version})
                </span>
                <ActiveBadge />
              </button>
            ))}

            <div className="plans-sidebar__section-label">Personal drafts</div>
            {personalDrafts.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className="plans-sidebar__row"
                data-selected={plan.id === editor.selectedPlanId}
                onClick={() => editor.selectPlan(plan.id)}
              >
                <span className="plans-sidebar__row-title">{plan.title}</span>
              </button>
            ))}

            <div className="plans-sidebar__section-label">Collaborative drafts</div>
            {collaborativeDrafts.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className="plans-sidebar__row plans-sidebar__row--accent"
                data-selected={plan.id === editor.selectedPlanId}
                onClick={() => editor.selectPlan(plan.id)}
              >
                <span className="plans-sidebar__row-meta">
                  <span className="plans-sidebar__row-title">
                    {plan.title} ({plan.version})
                  </span>
                  <span className="plans-sidebar__row-sub">Last updated {plan.lastUpdated}</span>
                  <span className="plans-sidebar__row-sub">Last updated by {plan.lastUpdatedBy}</span>
                </span>
                {plan.hasUnsavedChanges && (
                  <Tooltip content="This care plan has unsaved changes">
                    <span className="plans-sidebar__unsaved-dot" aria-label="Unsaved changes" />
                  </Tooltip>
                )}
              </button>
            ))}
          </aside>

          <section className="plan-content">
            <div className="plan-content__header">
              <button type="button" className="plan-content__back" aria-label="Back" onClick={() => navigate('/')}>
                <BackIcon size={20} />
              </button>
              <h1 className="plan-content__title">
                {editor.selectedPlan.title} ({editor.selectedPlan.version})
              </h1>
              {editor.selectedPlan.group !== 'active' && <InDraftBadge />}
            </div>

            <div className="plan-content__toolbar">
              <Button variant="primary" modifier="standard" size="small" onClick={editor.enterEdit}>
                Edit
              </Button>
              <span className="plan-content__version">{editor.selectedPlan.version}</span>
              <span className="plan-content__timestamp">{editor.selectedPlan.lastUpdated}</span>
              <Button variant="secondary" modifier="standard" size="small">
                <HistoryIcon size={14} /> History
              </Button>
              <Switch
                className="plan-content__subscribed"
                isSelected={editor.subscribed}
                onChange={editor.setSubscribed}
              >
                Subscribed
              </Switch>
            </div>

            <div className="plan-content__preview-card">
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
            <SectionNav
              sections={['consent', 'overview', 'respect']}
              active={editor.activeNav}
              onSelect={editor.setActiveNav}
            />
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
