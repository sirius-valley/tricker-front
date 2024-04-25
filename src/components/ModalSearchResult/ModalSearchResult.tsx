import Body1 from '@utils/typography/body1/body1'
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
          className="w-full bg-gray-500 rounded-b-xl py-2 border border-white/15"
          onClick={handleClose}
        >
          {results.length === 0 ? (
            <Body1 className="text-white">
              No options matches with your search.
            </Body1>
          ) : (
            <ul className="flex flex-col gap-1 w-full p-0">
              {results.map((item: string, index: number) => (
                <ItemDataBox key={index} label={item} onClick={handleClick} />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  )
}

export default ModalSearchResult
