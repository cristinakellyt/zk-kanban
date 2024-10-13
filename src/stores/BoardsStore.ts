import { defineStore } from 'pinia'
import type { Board, Task, SubTask } from '@/types/appTypes'

export const useBoardsStore = defineStore({
  id: 'BoardsStore',
  state: () => {
    return {
      boardsData: [] as Board[],
      currentBoard: {} as Board,
      currentTask: {} as Task
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

    setCurrentBoard(boardId: number) {
      const index = this.boardsData.findIndex((b) => b.id === boardId)
      this.currentBoard = this.boardsData[index]
    },

    deleteBoard(boardId: number) {
      const index = this.boardsData.findIndex((b) => b.id === boardId)
      this.boardsData.splice(index, 1)

      if (this.boardsData.length > 0) {
        this.currentBoard = this.boardsData[0] as Board
      } else {
        this.currentBoard = {} as Board
      }
    },

    addTask(boardId: number, columnId: number, task: Task) {
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      const columnIndex = this.boardsData[boardIndex].columns.findIndex((c) => c.id === columnId)
      this.boardsData[boardIndex].columns[columnIndex].tasks.push(task)
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

    editTask(boardId: number, newColumnId: number, oldColumnId: number, task: Task) {
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      const columnIndex = this.boardsData[boardIndex].columns.findIndex((c) => c.id === oldColumnId)
      const taskIndex = this.boardsData[boardIndex].columns[columnIndex].tasks.findIndex(
        (t) => t.id === task.id
      )
      this.boardsData[boardIndex].columns[columnIndex].tasks[taskIndex] = task

      if (newColumnId !== oldColumnId) {
        this.updateTaskColumn(boardId, task.id, newColumnId, oldColumnId)
      }
    },

    deleteTask(boardId: number, columnId: number, taskId: number) {
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      const columnIndex = this.boardsData[boardIndex].columns.findIndex((c) => c.id === columnId)
      const taskIndex = this.boardsData[boardIndex].columns[columnIndex].tasks.findIndex(
        (t) => t.id === taskId
      )
      this.boardsData[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1)
    }
  }
})
