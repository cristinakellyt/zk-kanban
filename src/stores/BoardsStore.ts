import { defineStore } from 'pinia'
import type { Board, Task, Column } from '@/types/appTypes'

const STORAGE_KEY = 'boardsData'
const CURRENT_BOARD_KEY = 'currentBoard'

export const useBoardsStore = defineStore({
  id: 'BoardsStore',
  state: () => {
    return {
      boardsData: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Board[],
      currentBoard: JSON.parse(localStorage.getItem(CURRENT_BOARD_KEY) || '{}') as Board,
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

    getCurrentBoardColumns(): Column[] {
      return this.currentBoard.columns
    }
  },
  actions: {
    saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.boardsData))
      localStorage.setItem(CURRENT_BOARD_KEY, JSON.stringify(this.currentBoard))
    },

    addBoard(board: Board) {
      this.boardsData.push(board)
      this.setCurrentBoard(board.id)
      this.saveToLocalStorage()
    },

    updateBoard(board: Board) {
      const index = this.boardsData.findIndex((b) => b.id === board.id)
      this.boardsData[index] = board
      this.setCurrentBoard(board.id)
      this.saveToLocalStorage()
    },

    removeBoard(boardId: number) {
      const index = this.boardsData.findIndex((b) => b.id === boardId)
      this.boardsData.splice(index, 1)
      this.saveToLocalStorage()
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
      this.saveToLocalStorage()
    },

    addTask(boardId: number, columnId: number, task: Task) {
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      const columnIndex = this.boardsData[boardIndex].columns.findIndex((c) => c.id === columnId)
      this.boardsData[boardIndex].columns[columnIndex].tasks.push(task)
      this.setCurrentBoard(boardId)
      this.saveToLocalStorage()
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
      this.setCurrentBoard(boardId)
      this.saveToLocalStorage()
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

      this.setCurrentBoard(boardId)
      this.saveToLocalStorage()
    },

    deleteTask(boardId: number, columnId: number, taskId: number) {
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      const columnIndex = this.boardsData[boardIndex].columns.findIndex((c) => c.id === columnId)
      const taskIndex = this.boardsData[boardIndex].columns[columnIndex].tasks.findIndex(
        (t) => t.id === taskId
      )
      this.boardsData[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1)
      this.saveToLocalStorage()
    }
  }
})
