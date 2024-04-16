import { DismissIcon, SearchIcon } from '@components/Icon'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const searchBarVariants = cva(
  ['flex items-center bg-white/5 border border-white/30'],
  {
    variants: {
      variant: {
        desktop: ['py-1 px-2 w-[147px] rounded gap-2 text-sm'],
        mobile: ['py-2 px-4 w-full rounded-lg gap-4']
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
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  variant,
  handleValue,
  placeholder = 'Search',
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
      className={`${variant === 'mobile' && 'rounded-lg'} flex md:w-fit w-full`}
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
          placeholder={placeholder}
          onChange={handleChange}
          className={`flex bg-transparent w-full focus:outline-none placeholder:text-gray-300 text-white font-inter`}
        />
        {value && (
          <div>
            <div
              className="hover:bg-gray-300/10 rounded-xl px-1 cursor-pointer"
              onClick={() => {
                setValue('')
                handleValue('')
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
