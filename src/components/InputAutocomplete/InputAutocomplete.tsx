import Input, { type InputProps } from '@components/Input/Input'
import ModalSearchResult from '@components/ModalSearchResult/ModalSearchResult'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import { handleErrorMessage } from '@data-provider/AxiosError'
import { useGetIssuesByTitle } from '@data-provider/query'
import useDebounce from '@hooks/useDebounce'
import { useCurrentProjectId, useUser, useUserRole } from '@redux/hooks'
import { useState, useEffect, useRef, useCallback } from 'react'

interface InputAutocompleteProps extends InputProps {
  issueName: string
}

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
  handleValue,
  issueName
}: InputAutocompleteProps): JSX.Element => {
  const { showSnackBar } = useSnackBar()
  const userRole = useUserRole()
  const user = useUser()
  const currentProjectId = useCurrentProjectId()
  const memoizedShowSnackBar = useCallback(showSnackBar, [showSnackBar])
  const [query, setQuery] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const resultsRef = useRef<HTMLDivElement | null>(null)

  const { mutate, error, data } = useGetIssuesByTitle()

  const handleSearchDebounced = useDebounce((query: string) => {
    mutate({
      isProjectManager: userRole === 'Project Manager',
      userId: user.id,
      projectId: currentProjectId,
      issueName,
      searchedText: query
    })
  }, 600)

  useEffect(() => {
    handleSearchDebounced(query)
  }, [query])

  useEffect(() => {
    if (error) memoizedShowSnackBar(handleErrorMessage(error), 'error')
  }, [error])

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

  const handleChange = (value: string): void => {
    setQuery(value)
    handleValue(value)
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
        handleValue={handleChange}
        placeholder={placeholder}
        tooltip={tooltip}
        defaultValue={defaultValue}
      />
      <ModalSearchResult
        show={showModal}
        results={data ?? []}
        handleClick={handleSelect}
        onClose={() => {
          setShowModal(false)
        }}
      />
    </div>
  )
}

export default InputAutocomplete
