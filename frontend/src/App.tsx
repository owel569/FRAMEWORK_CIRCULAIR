import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import QuestionnaireForm from './pages/QuestionnaireForm'
import ScoreDashboard from './pages/ScoreDashboard'
import ActionPlan from './pages/ActionPlan'
import NotFound from './pages/NotFound'
import ChatbotWidget from './components/ChatbotWidget'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questionnaire" element={<QuestionnaireForm />} />
          <Route path="/dashboard/:scoreId" element={<ScoreDashboard />} />
          <Route path="/plan/:scoreId" element={<ActionPlan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotWidget />
      </div>
    </Router>
  )
}

export default App
