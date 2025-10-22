import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import QuestionnaireForm from './pages/QuestionnaireForm'
import ScoreDashboard from './pages/ScoreDashboard'
import ActionPlan from './pages/ActionPlan'
import NotFound from './pages/NotFound'
import ChatbotWidget from './components/ChatbotWidget'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminQuestions from './pages/AdminQuestions'
import AdminChatbotDocs from './pages/AdminChatbotDocs'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questionnaire" element={<QuestionnaireForm />} />
          <Route path="/dashboard/:scoreId" element={<ScoreDashboard />} />
          <Route path="/plan/:scoreId" element={<ActionPlan />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/questions" element={<AdminQuestions />} />
          <Route path="/admin/chatbot-docs" element={<AdminChatbotDocs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotWidget />
      </div>
    </Router>
  )
}

export default App