import { Navigate, Route, Routes } from 'react-router-dom'
import { StartPage } from './pages/StartPage'
import { ConceptAPage } from './pages/ConceptAPage'
import { ConceptBPage } from './pages/ConceptBPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import './App.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/concept-a" element={<ConceptAPage />} />
      <Route path="/concept-b" element={<ConceptBPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
