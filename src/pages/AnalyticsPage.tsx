import { useNavigate } from 'react-router-dom'
import { UtilityHeader } from '../components/layout/UtilityHeader'
import './AnalyticsPage.scss'

export function AnalyticsPage() {
  const navigate = useNavigate()

  return (
    <div className="analytics-page">
      <UtilityHeader version="8.01" userName="Joe Bloggs" onExit={() => navigate('/')} />
      <main className="analytics-page__content">
        <h1>Analytics</h1>
        <p>This area is out of scope for the care planning prototype — reachable only via the area switcher.</p>
      </main>
    </div>
  )
}
