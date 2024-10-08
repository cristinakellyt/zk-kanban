import { defineStore } from 'pinia'
import type { Board, Task } from '@/types/appTypes'

export const useBoardsStore = defineStore({
  id: 'BoardsStore',
  state: () => {
    return {
      boardsData: [] as Board[],
      currentBoard: {} as Board
    }
  },
  getters: {
    getBoardsData(): Board[] {
      return this.boardsData
    },

    getCurrentBoard(): Board {
      return this.currentBoard
    },

    getCurrentBoardColumns(): { id: number; name: string; tasks: Task[] }[] {
      return this.currentBoard.columns
    }
  },
  actions: {
    addBoard(board: Board) {
      this.boardsData.push(board)
      this.setCurrentBoard(board.id)
    },

    updateBoard(boardId: number, board: Board) {
      const index = this.boardsData.findIndex((b) => b.id === boardId)
      this.boardsData[index] = board
      this.setCurrentBoard(board.id)
    },

    removeBoard(boardId: number) {
      const index = this.boardsData.findIndex((b) => b.id === boardId)
      this.boardsData.splice(index, 1)
    },

    addTask(boardId: number, columnId: number, task: Task) {
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      const columnIndex = this.boardsData[boardIndex].columns.findIndex((c) => c.id === columnId)
      this.boardsData[boardIndex].columns[columnIndex].tasks.push(task)
    },

    updateTask(boardId: number, task: Task) {
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      const columnIndex = this.boardsData[boardIndex].columns.findIndex((c) => c.id === task.id)
      const taskIndex = this.boardsData[boardIndex].columns[columnIndex].tasks.findIndex(
        (t) => t.id === task.id
      )
      this.boardsData[boardIndex].columns[columnIndex].tasks[taskIndex] = task
    },

    updateTaskColumn(boardId: number, taskId: number, newColumnId: number, oldColumnId: number) {
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      const newColumnIndex = this.boardsData[boardIndex].columns.findIndex(
        (c) => c.id === newColumnId
      )
      const oldColumnIndex = this.boardsData[boardIndex].columns.findIndex(
        (c) => c.id === oldColumnId
      )
      const taskIndex = this.boardsData[boardIndex].columns[oldColumnIndex].tasks.findIndex(
        (t) => t.id === taskId
      )
      const task = this.boardsData[boardIndex].columns[oldColumnIndex].tasks.splice(taskIndex, 1)
      //replace task to new column
      this.boardsData[boardIndex].columns[newColumnIndex].tasks.push(task[0])
    },

    setCurrentBoard(boardId: number) {
      const index = this.boardsData.findIndex((b) => b.id === boardId)
      this.currentBoard = this.boardsData[index]
    }
  }
})
