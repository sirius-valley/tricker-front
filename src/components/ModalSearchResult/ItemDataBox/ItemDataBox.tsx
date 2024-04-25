import Body1 from '@utils/typography/body1/body1'

interface ItemDataBoxProps {
  key: string
  label: string
  onClick: (option: string) => void
}
const ItemDataBox: React.FC<ItemDataBoxProps> = ({
  label,
  key,
  onClick
}: ItemDataBoxProps): JSX.Element => {
  return (
    <li
      className="flex w-full items-center relative cursor-pointer rounded hover:bg-gray-400 transition-colors duration-200 p-2 px-4 hover:shadow-button active:shadow-buttonClicked"
      onClick={() => {
        onClick(label)
      }}
      key={key}
    >
      <Body1 className="text-white">{label}</Body1>
    </li>
  )
}

export default ItemDataBox
