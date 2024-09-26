import type { Meta, StoryObj } from '@storybook/vue3'
import BaseInput from './BaseInput.vue'

const meta = {
  title: 'BaseComponents/BaseInput',
  component: BaseInput,
  render: (args: any) => ({
    components: { Input: BaseInput },
    setup() {
      return { args }
    },
    template: `<Input v-bind="args"/>`
  }),
  argTypes: {
    type: { control: 'text' },
    placeholder: { control: 'text' },
    fieldName: { control: 'text' },
    input: { control: 'text' },
    isReadOnly: { control: 'boolean' },
    debounce: { control: 'number' },
    maxLength: { control: 'number' },
    minLength: { control: 'number' },
    labelText: { control: 'text' },
    extraClass: { control: 'text' },
    pattern: { control: 'text' },
    textError: { control: 'text' }
  },
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof BaseInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your name',
    fieldName: 'name',
    input: '',
    isReadOnly: false,
    debounce: 0,
    maxLength: 0,
    minLength: 0,
    labelText: 'Name',
    extraClass: '',
    pattern: ''
  }
}

export const WithError: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your name',
    fieldName: 'name',
    input: '',
    isReadOnly: false,
    debounce: 0,
    maxLength: 0,
    minLength: 0,
    labelText: 'Name',
    extraClass: '',
    pattern: '',
    textError: "Can't be empty"
  }
}
