import Body1 from '@utils/typography/body1/body1'
import ItemDataBox from './ItemDataBox/ItemDataBox'

interface ModalSearchResultProps {
  show: boolean
  results: Array<{ id: string; name: string }>
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
          className="absolute w-full bg-gray-500 rounded-b-xl py-2 border border-white/15"
          onClick={handleClose}
        >
          {results.length === 0 ? (
            <Body1 className="text-white w-full flex items-center p-2 px-4">
              No options matches with your search.
            </Body1>
          ) : (
            <ul className="flex flex-col gap-1 w-full p-0">
              {results.map((item: { id: string; name: string }) => (
                <ItemDataBox
                  key={item.id}
                  label={item.name}
                  onClick={handleClick}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  )
}

export default ModalSearchResult
