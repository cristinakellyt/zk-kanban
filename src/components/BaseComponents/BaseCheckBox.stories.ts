import type { Meta, StoryObj } from '@storybook/vue3'

import BaseCheckBox from './BaseCheckBox.vue'

const meta: Meta = {
  title: 'BaseComponents/BaseCheckBox',
  component: BaseCheckBox,
  render: (args: any) => ({
    components: { CheckBox: BaseCheckBox },
    setup() {
      return { args }
    },
    template: `<CheckBox v-bind="args"/>`
  }),
  argTypes: {
    id: { control: 'text' },
    labelText: { control: 'text' },
    syncLabel: { control: 'boolean' },
    checkedVModel: { control: 'boolean' }
  },
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof BaseCheckBox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'checkbox',
    isDisabled: false,
    labelText: 'Checkbox',
    syncLabel: true,
    checkedVModel: false
  }
}

export const Checked: Story = {
  args: {
    id: 'checkbox',
    isDisabled: false,
    labelText: 'Checkbox',
    syncLabel: true,
    checkedVModel: true
  }
}
