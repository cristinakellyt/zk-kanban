import type { Meta, StoryObj } from '@storybook/vue3'
import { within, userEvent, expect, waitFor } from '@storybook/test'

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

export const WithKeyboardInteraction: Story = {
  args: {
    id: 'dropdown',
    placeholder: 'Select an option',
    fieldTitle: 'Dropdown',
    dropdownOptions: [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' }
    ]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Simulate opening dropdown
    const dropdown = canvas.getByTestId('dropdown')
    expect(dropdown).toBeInTheDocument()

    // Simulate user clicking on the dropdown to open it
    await userEvent.click(dropdown)

    // Ensure that options are visible before interacting
    await waitFor(() => expect(canvas.getByTestId('option-1')).toBeVisible())
    expect(canvas.getByTestId('option-1')).toBeInTheDocument()

    await userEvent.click(canvas.getByTestId('option-2')) // Click the second option
    expect(dropdown).toHaveTextContent('Option 2') // Check if dropdown reflects the selected option
  }
}
