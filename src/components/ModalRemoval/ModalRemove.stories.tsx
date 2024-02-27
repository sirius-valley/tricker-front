// import React from 'react';
import { type Story, type Meta } from '@storybook/react'
import ModalRemove, { type ModalRemoveProps } from './ModalRemove'

const meta: Meta<typeof ModalRemove> = {
  title: 'Components/ModalRemove',
  component: ModalRemove,
  tags: ['autodocs'],
  argTypes: {
    onRemove: { action: 'Member removed' }
  }
}

export default meta

const Template: Story<ModalRemoveProps> = (args) => <ModalRemove {...args} />

export const Default = Template.bind({})
Default.args = {
  memberName: 'Team memberName 1',
  projectName: 'Tricker Project',
  onRemove: () => {
    console.log('Member removed')
  }
}
