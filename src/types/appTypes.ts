interface Task {
  id: number
  title: string
  description: string
  status: { id: number; name: string }[]
  subTasks: SubTask[]
}

interface SubTask {
  id: number
  name: string
  isDone: boolean
}

interface Board {
  id: number
  boardName: string
  columns: { id: number; name: string }[]
  tasks: Task[]
}

export type { Task, SubTask, Board }
