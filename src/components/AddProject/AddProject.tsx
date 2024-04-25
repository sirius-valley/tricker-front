import React, { useEffect, useState } from 'react'
import useScreenSize from '@hooks/useScreenSize'
import Body1 from '@utils/typography/body1/body1'
import { SearchBar } from '@components/SearchBar/SearchBar'
import SquaredIconButton from '@components/SquaredIconButton/SquaredIconButton'
import { AddTimeIcon } from '@components/Icon'
import useDebounce from '@hooks/useDebounce'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import ActionButton from '@components/ActionButton/ActionButton'
import ModalAddNewProject from '@components/ModalAddNewProject/ModalAddNewProject'

export interface AddProjectProps {
  handleSearch: (searchedProject: string) => void
}

const AddProject: React.FC<AddProjectProps> = ({
  handleSearch
}: AddProjectProps): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [searchedValue, setSearchedValue] = useState<string>('')
  const screen = useScreenSize()

  const handleSearchDebounced = useDebounce((searchedValue: string) => {
    handleSearch(searchedValue)
  }, 1000)

  useEffect(() => {
    handleSearchDebounced(searchedValue)
  }, [searchedValue])

  return (
    <>
      <ModalAddNewProject
        onClose={() => {
          setShowModal(false)
        }}
        show={showModal}
      />
      {screen.width >= 768 ? (
        <div className="flex flex-col justify-center w-full">
          <div className="max-w-[467px] h-fit rounded-tl-xl bg-gray-500 border-b border-white/10 flex flex-wrap xl:flex-nowrap items-center justify-between gap-2 p-[22px] pl-6">
            <div className="flex w-fit items-center">
              <Body1 className="text-[18px] leading-[22px] text-white text-nowrap">
                My Projects
              </Body1>
            </div>
            <div className="flex items-center w-full gap-2 lg: justify-between">
              <SquaredIconButton
                onClick={() => {
                  setShowModal(true)
                }}
                icon={<AddTimeIcon />}
              />
              <div className="xl:max-w-[150px] max-w-full">
                <SearchBar handleValue={setSearchedValue} variant={'desktop'} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full">
          <div className="bg-gray-700 flex flex-wrap items-center justify-center gap-4 p-6 pb-4 w-full">
            <div className="flex w-full">
              <div className="flex w-fit gap-2 items-center">
                <Icon name={'FolderIcon'} />
                <Body2 className="text-[20px] leading-[22px] text-white">
                  My Projects
                </Body2>
              </div>
            </div>
            <div className="flex gap-4 w-full items-center">
              <SearchBar handleValue={setSearchedValue} variant={'mobile'} />
              <ActionButton
                onClick={() => {
                  setShowModal(true)
                }}
                variant="add"
              />{' '}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddProject
