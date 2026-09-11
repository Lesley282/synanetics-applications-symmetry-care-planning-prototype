import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, MenuIcon, TextField, Toast } from '@synanetics/syn-library'
import { UtilityHeader } from '../components/layout/UtilityHeader'
import { isValidNhsNumber } from '../lib/nhsNumber'
import { seedPatient } from '../data/seed'
import logo from '../assets/symmetry-logo.png'
import './StartPage.scss'

export function StartPage() {
  const navigate = useNavigate()
  const [nhsInput, setNhsInput] = useState('')
  const [showError, setShowError] = useState(false)
  const [shake, setShake] = useState(false)
  const [showToast, setShowToast] = useState(true)

  const digitsOnly = nhsInput.replace(/\D/g, '').slice(0, 10)
  const canSubmit = isValidNhsNumber(digitsOnly)

  const handleChange = (value: string) => {
    setNhsInput(value.replace(/\D/g, '').slice(0, 10))
    setShowError(false)
  }

  const handleSubmit = () => {
    if (!canSubmit) {
      setShowError(true)
      setShake(true)
      window.setTimeout(() => setShake(false), 400)
      return
    }
    navigate(`/concept-a?nhs=${digitsOnly}`)
  }

  return (
    <div className="start-page">
      <UtilityHeader
        version="1.11.0"
        userName="Lesley Rooney"
        rightIcons={
          <button type="button" className="utility-header__icon-btn" aria-label="Menu">
            <MenuIcon size={18} />
          </button>
        }
      />

      <main className="start-page__content">
        <div className="start-page__hero">
          <span className="start-page__hero-text">Welcome to</span>
          <img src={logo} alt="" className="start-page__hero-logo" />
        </div>

        <div className="start-page__card">
          <p className="start-page__intro">To begin, please provide a patient NHS number</p>

          <div className={`start-page__form-row${shake ? ' shake' : ''}`}>
            <TextField
              label="NHS number"
              value={digitsOnly}
              onChange={handleChange}
              placeholder="e.g. 965 821 6913"
              className="start-page__input"
            />
            <Button variant="primary" modifier="standard" isDisabled={!canSubmit} onClick={handleSubmit}>
              Find patient
            </Button>
          </div>

          <p className={`start-page__helper${showError ? ' start-page__helper--error' : ''}`}>
            {showError ? 'Enter a valid 10-digit NHS number' : 'Enter a 10-digit NHS number'}
          </p>

          <p className="start-page__footer">Powered by ◆ Synanetics</p>
        </div>
      </main>

      <p className="start-page__page-footer">Powered by Synanetics</p>

      {showToast && (
        <div className="start-page__toast">
          <Toast
            title="Unsaved changes"
            variant="warning"
            onClose={() => setShowToast(false)}
            description={
              <div className="start-page__toast-body">
                <p>
                  Welcome back. We detected you had unsaved changes. Use the link below to return to your last care plan
                  and submit changes.
                </p>
                <Button
                  variant="primary"
                  modifier="standard"
                  size="small"
                  onClick={() => navigate(`/concept-a?nhs=${seedPatient.nhsNumber}`)}
                >
                  Open care plan
                </Button>
              </div>
            }
          />
        </div>
      )}
    </div>
  )
}
