//Types
import type { Task, SubTask } from '@/types/appTypes'

//Helpers
import generateNumericId from '@/utils/generateNumericId'

const BOILERPLATE_COLUMNS = [{ id: generateNumericId(), name: 'To Do', tasks: [] }] as {
  id: number
  name: string
  tasks: Task[]
}[]

const BOILERPLATE_SUBTASKS = [{ id: generateNumericId(), name: '', isDone: false }] as SubTask[]

export { BOILERPLATE_COLUMNS, BOILERPLATE_SUBTASKS }
