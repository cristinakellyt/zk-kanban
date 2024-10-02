import { defineStore } from 'pinia'

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

export const useBoardsStore = defineStore({
  id: 'BoardsStore',
  state: () => {
    return {
      boardsData: [] as Board[]
    }
  },
  getters: {
    getBoardsData(): Board[] {
      return this.boardsData
    }
  },
  actions: {
    addBoard(board: Board) {
      this.boardsData.push(board)
    },
    updateBoard(board: Board) {
      const index = this.boardsData.findIndex((b) => b.boardName === board.boardName)
      this.boardsData[index] = board
    }
  }
})
