import ReactDom from 'react-dom'

interface ModalSearchResultProps {
  show: boolean
  results: string[]
  handleClick: (value: string) => void
  onClose: () => void
}

const ModalSearchResult: React.FC<ModalSearchResultProps> = ({
  show,
  results,

  onClose
}: ModalSearchResultProps): JSX.Element | null => {
  const handleClose = (event: React.MouseEvent): void => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const portalElement = document.getElementById('portal')
  if (!portalElement) {
    return null
  } else {
    return ReactDom.createPortal(
      <>
        {show && (
          <div
            onClick={handleClose}
            className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          >
            {results.map((option: string) => (
              <div key={option}>{option}</div>
            ))}
          </div>
        )}
      </>,
      portalElement
    )
  }
}

export default ModalSearchResult
