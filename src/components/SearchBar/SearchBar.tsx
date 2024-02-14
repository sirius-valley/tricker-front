import { DismissIcon, SearchIcon } from '@components/Icon'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const searchBarVariants = cva(
  ['flex items-center bg-gray-600 gap-2 w-fit h-fit'],
  {
    variants: {
      variant: {
        desktop: ['border border-white/30 py-1 px-2 rounded'],
        mobile: ['py-2 px-4 w-[288px] rounded-lg']
      }
    },
    defaultVariants: {
      variant: 'desktop'
    }
  }
)

interface SearchBarProps
  extends VariantProps<typeof searchBarVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  handleValue: (value: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  variant,
  handleValue,
  className
}) => {
  const [value, setValue] = React.useState<string>('')
  const iconSize: string = variant === 'desktop' ? '20px' : '24px'
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
    handleValue(e.target.value)
  }
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    React.useRef<HTMLInputElement>(null)
  const handleClick = (): void => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  return (
    <div
      className={`${variant === 'mobile' ? 'bg-gradient p-px rounded-lg w-[289px]' : 'w-48'} flex`}
    >
      <div
        className={`${searchBarVariants({ variant, className })}`}
        onClick={handleClick}
      >
        <div className={'min-w-[' + iconSize + ']'}>
          <SearchIcon width={iconSize} height={iconSize} />
        </div>
        <input
          ref={inputRef}
          value={value}
          placeholder="Search"
          onChange={handleChange}
          className={`flex bg-transparent focus:outline-none placeholder:text-gray-300 text-white w-full`}
        />
        {value && (
          <div>
            <div
              className="hover:bg-gray-300/10 rounded-xl px-1 cursor-pointer"
              onClick={() => {
                setValue('')
              }}
            >
              <DismissIcon width={iconSize} height={iconSize} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
