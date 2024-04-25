import Input, { type InputProps } from '@components/Input/Input'
import ModalSearchResult from '@components/ModalSearchResult/ModalSearchResult'
import useDebounce from '@hooks/useDebounce'
import { useState, useEffect } from 'react'

const InputAutocomplete = ({
  value = '',
  className,
  variant,
  type = 'text',
  helpertext = '',
  label = '',
  required = false,
  readonly = false,
  placeholder = '',
  tooltip = '',
  defaultValue = ''
}: InputProps): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(true)

  const handleSearchDebounced = useDebounce((query: string) => {
    console.log(query)
    // mutate({query})
  }, 300)

  useEffect(() => {
    handleSearchDebounced(query)
  }, [query])

  //   const handleClick = () => {
  //     if (inputRef.current) {
  //       inputRef.current.focus()
  //       setIsOpen(true)
  //     }
  //   }

  const handleSelect = (option: string): void => {
    setQuery(option)
    setShowModal(true)
  }

  return (
    <div className="relative">
      <Input
        value={value}
        className={className}
        variant={variant}
        type={type}
        helpertext={helpertext}
        label={label}
        required={required}
        readonly={readonly}
        handleValue={setQuery}
        placeholder={placeholder}
        tooltip={tooltip}
        defaultValue={defaultValue}
      />
      {query !== '' && showModal && (
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
