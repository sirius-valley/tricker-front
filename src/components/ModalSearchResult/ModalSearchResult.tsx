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

  return (
    <>
      {show && (
        <div
          className="w-full flex flex-col w-full h-fit gap-2.5 justify-center"
          onClick={handleClose}
        >
          <div className="flex flex-col gap-2 w-full bg-gray-300 rounded-b-3xl p-4">
            <ul className="flex flex-col gap-2.5 h-full w-full">
              {results.map((item: string, index: number) => {
                return (
                  <ItemDataBox key={index} label={item} onClick={handleClick} />
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
      )}
    </>
  )
}

export default ModalSearchResult
