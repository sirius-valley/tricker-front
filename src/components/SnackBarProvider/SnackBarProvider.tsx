import NotificationBadge from '@components/NotificationBadge/NotificationBadge'
import React from 'react'

interface SnackBar {
  message: string
  type: 'default' | 'success' | 'error' | 'warning'
}

interface SnackBarContextType {
  showSnackBar: (
    message: string,
    type: 'default' | 'success' | 'error' | 'warning'
  ) => void
}

const SnackbarContext = React.createContext<SnackBarContextType | null>(null)

export const useSnackBar = (): SnackBarContextType => {
  const context = React.useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}

interface SnackBarProviderProps {
  children: React.ReactNode
}

export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({
  children
}) => {
  const [snackBars, setSnackBars] = React.useState<SnackBar[]>([])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSnackBars((prev) => prev.slice(1))
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [snackBars])

  const showSnackBar = (
    message: string,
    type: 'default' | 'success' | 'error' | 'warning'
  ): void => {
    setSnackBars((prev) => [...prev, { message, type }])
  }

  const handleOnClose = (): void => {
    setSnackBars((prev) => prev.slice(1))
  }

  return (
    <SnackbarContext.Provider value={{ showSnackBar }}>
      {children}
      {snackBars.map((snackBar: SnackBar, index: number) => (
        <div
          className="fixed bottom-5 left-5 z-50 flex justify-center items-center animate-slideInLeft"
          key={index}
        >
          <NotificationBadge
            variant={snackBar.type}
            handleClose={handleOnClose}
          >
            {snackBar.message}
          </NotificationBadge>
        </div>
      ))}
    </SnackbarContext.Provider>
  )
}
