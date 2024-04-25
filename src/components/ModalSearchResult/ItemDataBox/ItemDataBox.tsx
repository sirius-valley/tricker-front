interface ItemDataBoxProps {
  key: number
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
      className="flex items-center relative cursor-pointer select-none rounded-xl px-4 hover:bg-gray-400/10 transition-colors duration-200"
      onClick={() => {
        onClick(label)
      }}
      key={key}
    >
      <span className="text-gray-600 leading-[22px] text-sm font-inter italic">
        {label}
      </span>
    </li>
  )
}

export default ItemDataBox
