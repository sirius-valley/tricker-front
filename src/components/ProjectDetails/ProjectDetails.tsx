import React, { useEffect, useState } from 'react'
import H1 from '@utils/typography/h1/h1'
import Body1 from '@utils/typography/body1/body1'
import SquaredIconButton from '@components/SquaredIconButton/SquaredIconButton'
import Icon from '@components/Icon/Icon'
import Input from '@components/Input/Input'
import { Tooltip } from '@components/Tooltip/Tooltip'
import ModalRefreshProject from '@components/ModalRefreshProject/ModalRefreshProject'
import useScreenSize from '@hooks/useScreenSize'
import config from '../../../tailwind.config'

export interface ProjectDetailsProps {
  id: string
  url: string
  name: string
  lastSync: Date
  provider: string
  isProjectManager?: boolean
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  id,
  name,
  url,
  lastSync,
  provider,
  isProjectManager = false
}) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const [tt1content, setTt1Content] = useState('Sync project')
  const [tt2content, setTt2Content] = useState('Copy to clipboard')
  const [tt3content, setTt3Content] = useState('Copy to clipboard')
  const [showModal, setShowModal] = useState(false)

  const colors = config.theme.extend.colors
  const screen = useScreenSize()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTt1Content('Sync project')
      setTt2Content('Copy to clipboard')
      setTt3Content('Copy to clipboard')
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [tt1content, tt2content, tt3content])

  return (
    <div className="flex flex-col w-full h-fit text-white gap-8">
      <ModalRefreshProject
        show={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        provider={provider}
        projectId={id}
      />
      <div
        className="flex w-full justify-between items-center"
        style={
          screen.width >= 768
            ? { flexDirection: 'row' }
            : { flexDirection: 'column', placeItems: 'start' }
        }
      >
        <H1 className="text-3xl leading-[36px]">{name}</H1>
        {isProjectManager && (
          <div className="flex items-center gap-4 w-fit">
            <Body1 className="text-gray-300">
              Last Project Sync: {formatDate(lastSync)}
            </Body1>
            <Tooltip content="Sync project">
              <SquaredIconButton
                onClick={() => {
                  setShowModal(true)
                }}
                style={{ borderColor: colors.primary[400] }}
                className="w-10 h-10"
                icon={<Icon name="RefreshIcon" />}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <div className="flex w-full gap-6 justify-between items-end">
        <div className="w-full">
          <Input
            handleValue={() => {}}
            defaultValue={id}
            variant="disabled"
            label="Project ID"
          />
        </div>
        <Tooltip content={tt2content}>
          <SquaredIconButton
            onClick={() => {
              navigator.clipboard.writeText(id)
              setTt3Content('Copy to clipboard')
              setTt2Content('Copied!')
            }}
            isMobile={screen.width <= 768}
            className="min-w-10 min-h-10"
            icon={<Icon name="CopyIcon" />}
          />
        </Tooltip>
      </div>
      <div className="flex w-full gap-6 justify-between items-end">
        <div className="w-full">
          <Input
            handleValue={() => {}}
            defaultValue={url}
            variant="disabled"
            label="Project URL"
          />
        </div>
        <Tooltip content={tt3content}>
          <SquaredIconButton
            isMobile={screen.width <= 768}
            onClick={() => {
              navigator.clipboard.writeText(url)
              setTt2Content('Copy to clipboard')
              setTt3Content('Copied!')
            }}
            className="min-w-10 min-h-10"
            icon={<Icon name="CopyIcon" />}
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default ProjectDetails
