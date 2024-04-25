import ReactDom from 'react-dom'
import ItemDataBox from './ItemDataBox/ItemDataBox'

interface ModalSearchResultProps {
  show: boolean
  results: string[]
  handleClick: (value: string) => void
  onClose: () => void
}

const ModalSearchResult: React.FC<ModalSearchResultProps> = ({
  show,
  results,
  handleClick,
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
            <div className="w-full flex flex-col w-[360px] h-fit gap-2.5 pl-5 justify-center">
              <div className="flex flex-col gap-2 w-full h-fit">
                <div className="flex flex-col gap-2 p-4 bg-white z-50 rounded-b-3xl w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <ul className="flex flex-col gap-2.5 h-full w-full">
                      {results.map((item: string, index: number) => {
                        return (
                          <ItemDataBox
                            key={index}
                            label={item}
                            onClick={handleClick}
                          />
                        )
                      })}
                    </ul>
                  </div>
                  {results.length === 0 && (
                    <div className="flex items-center box-border h-fit pt-2.5 gap-2.5">
                      <p className="font-bold text-sm italic font-inter leading-[22px] text-gray-600">
                        No options matches with your search.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>,
      portalElement
    )
  }
}

export default ModalSearchResult
