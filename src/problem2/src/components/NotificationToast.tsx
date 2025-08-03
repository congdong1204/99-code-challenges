import { useEffect } from 'react'
import Icons from './Icons'

interface NotificationToastProps {
  type: 'success' | 'error' | 'info'
  message: string
  onClose: () => void
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  type,
  message,
  onClose,
}) => {
  const isSuccess = type === 'success'
  const isError = type === 'error'

  useEffect(() => {
    const timer = setTimeout(onClose, 1500)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-xl border backdrop-blur-sm shadow-lg ${
        isSuccess
          ? 'bg-green-900 bg-opacity-20 border-green-500 border-opacity-50'
          : isError
          ? 'bg-red-900 bg-opacity-20 border-red-500 border-opacity-50'
          : 'bg-blue-900 bg-opacity-20 border-blue-500 border-opacity-50'
      }`}
    >
      <div className="flex items-center gap-2">
        {isSuccess && (
          <Icons.CheckCircle className="text-green-400" size={16} />
        )}
        {isError && <Icons.AlertCircle className="text-red-400" size={16} />}
        <span
          className={`text-sm ${
            isSuccess
              ? 'text-green-400'
              : isError
              ? 'text-red-400'
              : 'text-blue-400'
          }`}
        >
          {message}
        </span>
      </div>
    </div>
  )
}

export default NotificationToast
