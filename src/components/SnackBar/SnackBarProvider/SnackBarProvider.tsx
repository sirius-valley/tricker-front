import React from 'react'

interface Snackbar {
  message: string
  type: 'success' | 'error'
}

interface SnackbarContextType {
  showSnackbar: (message: string, type: 'success' | 'error') => void
}

const SnackbarContext = React.createContext<SnackbarContextType | null>(null)

export const useSnackbar = (): SnackbarContextType => {
  const context = React.useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}

interface SnackBarProps {
  children: React.ReactNode
}

export const SnackBarProvider: React.FC<SnackBarProps> = ({ children }) => {
  const [snackbars, setSnackbars] = React.useState<Snackbar[]>([])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSnackbars((prev) => prev.slice(1))
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [snackbars])

  const showSnackbar = (message: string, type: 'success' | 'error'): void => {
    setSnackbars((prev) => [...prev, { message, type }])
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbars.map((snackbar, index) => (
        <div key={index} className={`snackbar ${snackbar.type}`}>
          {snackbar.message}
        </div>
      ))}
    </SnackbarContext.Provider>
  )
}
