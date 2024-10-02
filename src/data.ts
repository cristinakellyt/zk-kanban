interface Task {
  id: number
  title: string
  description: string
  status: string
  subTasks: SubTask[]
}

interface SubTask {
  id: number
  title: string
  isDone: boolean
}

interface Board {
  boardName: string
  columnName: string[]
  tasks: Task[]
}

let tasksData: Task[] = [
  {
    id: 1,
    title: 'Finish Kanban',
    description: 'Finish the Kanban project',
    status: 'todo',
    subTasks: <SubTask[]>[
      {
        id: 1,
        title: 'Create a new task',
        isDone: false
      },
      {
        id: 2,
        title: 'Update a task',
        isDone: true
      }
    ]
  }
]

let boardsData: Board[] = []

export { tasksData, boardsData }
