//Types
import type { Task, SubTask, Column, Board } from '@/types/appTypes'
import generateNumericId from '@/utils/generateNumericId'

const DATA = {
  id: generateNumericId(),
  boardName: 'Welcome Board',
  columns: [
    {
      id: generateNumericId(),
      name: 'To Do',
      tasks: [
        {
          id: generateNumericId(),
          title: 'Click on a task to see details',
          description: 'You can see the description of the task here',
          subTasks: [
            { id: generateNumericId(), name: 'Drop the task in done when completed', isDone: false }
          ]
        },
        {
          id: generateNumericId(),
          title: 'Drag and drop this task',
          description: 'You can drag and drop tasks between columns',
          subTasks: [
            { id: generateNumericId(), name: 'Drop the task in done when completed', isDone: false }
          ]
        },
        {
          id: generateNumericId(),
          title: 'Create a new task',
          description: 'You can create a new task by clicking on the + button on top right',
          subTasks: [
            { id: generateNumericId(), name: 'Drop the task in done when completed', isDone: false }
          ]
        },
        {
          id: generateNumericId(),
          title: 'Edit/Delete a task',
          description:
            'You can edit or delete a task by clicking on the three dots top right of this container and selecting edit',
          subTasks: [
            { id: generateNumericId(), name: 'Drop the task in done when completed', isDone: false }
          ]
        },
        {
          id: generateNumericId(),
          title: 'Create a new column',
          description:
            'You can create a column by clicking on empty column, there you can also edit the name of the board',
          subTasks: [
            { id: generateNumericId(), name: 'Drop the task in done when completed', isDone: false }
          ]
        },
        {
          id: generateNumericId(),
          title: 'Delete a column',
          description: 'You can delete a column by clicking on X icon when editing the board',
          subTasks: [
            { id: generateNumericId(), name: 'Drop the task in done when completed', isDone: false }
          ]
        },
        {
          id: generateNumericId(),
          title: 'Edit or delete a board',
          description:
            'You can edit or delete a board by clicking on the three dots top right of the board name',
          subTasks: [
            { id: generateNumericId(), name: 'Subtask 1', isDone: false },
            { id: generateNumericId(), name: 'Subtask 2', isDone: true }
          ]
        },
        {
          id: generateNumericId(),
          title: 'Create a new board',
          description:
            "You can create a new board by clicking on the button 'Create a new Board' on the nav sideBar",
          subTasks: [
            { id: generateNumericId(), name: 'Subtask 1', isDone: false },
            { id: generateNumericId(), name: 'Subtask 2', isDone: true }
          ]
        },
        {
          id: generateNumericId(),
          title: 'Choose a color theme',
          description:
            'You can choose a color theme by clicking on the toggle button on the nav sideBar',
          subTasks: [
            { id: generateNumericId(), name: 'Subtask 1', isDone: false },
            { id: generateNumericId(), name: 'Subtask 2', isDone: true }
          ]
        },
        {
          id: generateNumericId(),
          title: 'Enjoy the app!',
          description: 'Thanks for using this app, hope you enjoy it and enhance your productivity',
          subTasks: [
            { id: generateNumericId(), name: 'Subtask 1', isDone: false },
            { id: generateNumericId(), name: 'Subtask 2', isDone: true }
          ]
        }
      ],
      color: '#49c4e5'
    },
    { id: generateNumericId(), name: 'In Progress', tasks: [], color: '#f7d358' },
    { id: generateNumericId(), name: 'Done', tasks: [], color: '#5cb85c' }
  ]
} as Board

export default DATA
