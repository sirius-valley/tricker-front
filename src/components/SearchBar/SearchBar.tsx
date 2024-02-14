import { DismissIcon, SearchIcon } from '@components/Icon'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const searchBarVariants = cva(
  ['flex items-center bg-gray-600 gap-2 w-fit h-fit'],
  {
    variants: {
      variant: {
        desktop: ['border border-white/30 py-1 px-2 rounded'],
        mobile: ['py-2 px-4 w-[289px] rounded-lg']
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
        <SearchIcon width={iconSize} height={iconSize} />
        <input
          ref={inputRef}
          value={value}
          placeholder="Search"
          onChange={handleChange}
          className={`bg-transparent focus:outline-none placeholder:font-inter placeholder:text-gray-300 text-white focus:font-inter ${variant === 'desktop' && value ? 'w-[120px]' : 'w-[148px]'}`}
        />
        {value && (
          <div>
            <div
              className="hover:bg-gray-300/10 rounded-xl p-px"
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
