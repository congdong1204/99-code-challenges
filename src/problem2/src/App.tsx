import Icons from './components/Icons'
import SwapForm from './components/SwapForm'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#392d69]  to-[#b57bee] p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-4">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Icons.ArrowUpDown className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Currency Swap
          </h1>
        </div>
        <SwapForm />
      </div>
    </div>
  )
}

export default App
