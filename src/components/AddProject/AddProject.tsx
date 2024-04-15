import React, { useEffect, useState } from 'react'
import useScreenSize from '@hooks/useScreenSize'
import Body1 from '@utils/typography/body1/body1'
import { SearchBar } from '@components/SearchBar/SearchBar'
import SquaredIconButton from '@components/SquaredIconButton/SquaredIconButton'
import { AddTimeIcon } from '@components/Icon'
import useDebounce from '@hooks/useDebounce'
import Icon from '@components/Icon/Icon'

export interface AddProjectProps {
  handleSearch: (searchedProject: string) => void
}

const AddProject: React.FC<AddProjectProps> = ({
  handleSearch
}: AddProjectProps): JSX.Element => {
  //   const [showModal, setShowModal] = useState<boolean>(false)
  const [searchedValue, setSearchedValue] = useState<string>('')
  const screen = useScreenSize()

  const handleSearchDebounced = useDebounce((searchedValue: string) => {
    handleSearch(searchedValue)
  }, 1000)

  useEffect(() => {
    handleSearchDebounced(searchedValue)
  }, [searchedValue])

  return screen.width >= 768 ? (
    <div className="flex flex-col justify-center w-full">
      <div className="max-w-[467px] h-fit rounded-tl-xl bg-gray-500 border-b border-white/10 flex flex-wrap items-center justify-center gap-8 p-[22px] pl-6">
        <div className="flex w-fit gap-2 items-center">
          <Body1 className="text-[17px] leading-[22px] text-white">
            My Projects
          </Body1>
          <SquaredIconButton onClick={() => {}} icon={<AddTimeIcon />} />{' '}
        </div>
        <div className="flex gap-2 items-center">
          <SearchBar handleValue={setSearchedValue} variant={'desktop'} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center w-full">
      <div className="max-w-[467px] h-fit rounded-tl-xl bg-gray-500 border-b border-white/10 flex flex-wrap items-center justify-center gap-8 p-[22px] pl-6">
        <div className="flex w-fit gap-2 items-center">
          <Icon name={'FolderIcon'} />
          <Body1 className="text-[17px] leading-[22px] text-white">
            My Projects
          </Body1>
        </div>
        <div className="flex gap-2 items-center">
          <SearchBar handleValue={setSearchedValue} variant={'desktop'} />
          <SquaredIconButton onClick={() => {}} icon={<AddTimeIcon />} />{' '}
        </div>
      </div>
    </div>
  )
}

export default AddProject
