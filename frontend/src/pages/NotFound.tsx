import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-circular-green/10 to-circular-blue/10">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page non trouvée</p>
        <Link to="/" className="btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
