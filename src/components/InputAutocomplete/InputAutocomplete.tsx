import Input, { type InputProps } from '@components/Input/Input'
import ModalSearchResult from '@components/ModalSearchResult/ModalSearchResult'
import useDebounce from '@hooks/useDebounce'
import { useState, useEffect, useRef } from 'react'

const InputAutocomplete = ({
  className,
  variant,
  helpertext = '',
  label = '',
  required = false,
  readonly = false,
  placeholder = '',
  tooltip = '',
  defaultValue = '',
  handleValue
}: InputProps): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const resultsRef = useRef<HTMLDivElement | null>(null)

  const handleSearchDebounced = useDebounce((query: string) => {
    console.log(query)
    // mutate({query})
  }, 300)

  useEffect(() => {
    handleSearchDebounced(query)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setShowModal(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (option: string): void => {
    setQuery(option)
    handleValue(option)
    setShowModal(false)
  }

  return (
    <div className="relative" ref={resultsRef}>
      <Input
        onFocus={() => {
          setShowModal(true)
        }}
        value={query}
        className={className}
        variant={variant}
        type={'text'}
        helpertext={helpertext}
        label={label}
        required={required}
        readonly={readonly}
        handleValue={setQuery}
        placeholder={placeholder}
        tooltip={tooltip}
        defaultValue={defaultValue}
      />
      {query !== '' && (
        <ModalSearchResult
          show={showModal}
          results={['opcion 1', 'opcion 2', 'opcion 3', 'opcion 4', 'opcion 5']}
          handleClick={handleSelect}
          onClose={() => {
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}

export default InputAutocomplete
