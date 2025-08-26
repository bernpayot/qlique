import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupForm from './pages/SignupForm'
import SignInForm from './pages/SignInForm'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/signin" element={<SignInForm />} />
    </Routes>
  )
}
