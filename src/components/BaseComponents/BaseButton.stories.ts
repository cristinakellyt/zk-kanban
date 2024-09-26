import type { Meta, StoryObj } from '@storybook/vue3'
import iconShowSidebar from '../../assets/icons/icon-show-sidebar.svg'

import BaseButton from './BaseButton.vue' // Import your Button component

const meta = {
  title: 'BaseComponents/BaseButton',
  component: BaseButton,
  render: (args: any) => ({
    components: { Button: BaseButton },
    setup() {
      return { args }
    },
    template: `<Button v-bind="args"/>`
  }),
  argTypes: {
    onClick: { action: 'click' }, // Log click actions in Storybook
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    buttonStyle: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary']
    },
    isDisabled: { control: 'boolean' },
    inverted: { control: 'boolean' },
    icon: { control: 'text' }
  },
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof BaseButton>

export default meta

// Define a type for the stories using StoryObj
type Story = StoryObj<typeof meta>

// Stories for different states of the component
export const Primary: Story = {
  args: {
    text: 'Primary Button',
    buttonStyle: 'primary',
    size: 'medium',
    path: '/home'
  }
}

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    buttonStyle: 'secondary',
    size: 'medium',
    path: '/about'
  }
}

export const Tertiary: Story = {
  args: {
    text: 'Tertiary Button',
    buttonStyle: 'tertiary',
    size: 'medium'
  }
}

export const Small: Story = {
  args: {
    text: 'Small Button',
    size: 'small'
  }
}

export const Medium: Story = {
  args: {
    text: 'Medium Button',
    size: 'medium'
  }
}

export const Large: Story = {
  args: {
    text: 'Large Button',
    size: 'large'
  }
}
export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    isDisabled: true,
    size: 'medium',
    buttonStyle: 'primary'
  }
}

export const Inverted: Story = {
  args: {
    text: 'Inverted Button',
    inverted: true,
    size: 'medium',
    buttonStyle: 'tertiary'
  }
}

export const WithIcon: Story = {
  args: {
    text: 'Button with Icon',
    size: 'medium',
    icon: iconShowSidebar
  }
}
