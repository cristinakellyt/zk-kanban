import type { Meta, StoryObj } from '@storybook/vue3'

import BaseDropdown from './BaseDropdown.vue'

const meta: Meta = {
  title: 'BaseComponents/BaseDropdown',
  component: BaseDropdown,
  render: (args: any) => ({
    components: { Dropdown: BaseDropdown },
    setup() {
      return { args }
    },
    template: `<Dropdown v-bind="args"/>`
  }),
  argTypes: {
    id: { control: 'text' },
    placeholder: { control: 'text' },
    fieldTitle: { control: 'text' },
    dropdownOptions: { control: 'object' },
    selectedOption: { control: 'object' }
  },
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof BaseDropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'dropdown',
    placeholder: 'Select an option',
    fieldTitle: 'Dropdown',
    dropdownOptions: [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' }
    ],
    selectedOption: { id: 1, name: 'Option 1' }
  }
}
