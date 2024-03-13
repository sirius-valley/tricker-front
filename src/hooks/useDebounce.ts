import { useRef } from 'react'

const useDebounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((this: ThisParameterType<F>, ...args: Parameters<F>) => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const later = (): void => {
      clearTimeout(timeoutRef.current)
      func.apply(this, args)
    }

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(later, wait)
  }
}

export default useDebounce
