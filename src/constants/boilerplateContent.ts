//Types
import type { Task, SubTask, Column } from '@/types/appTypes'

//Helpers
import generateNumericId from '@/utils/generateNumericId'

const BOILERPLATE_COLUMNS = [
  { id: generateNumericId(), name: 'To Do', tasks: [], color: '#49c4e5' }
] as Column[]

const BOILERPLATE_SUBTASKS = [{ id: generateNumericId(), name: '', isDone: false }] as SubTask[]

export { BOILERPLATE_COLUMNS, BOILERPLATE_SUBTASKS }
