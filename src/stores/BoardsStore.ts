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

    getCurrentBoardColumns(): { id: number; name: string }[] {
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
    },

    removeBoard(boardId: number) {
      const index = this.boardsData.findIndex((b) => b.id === boardId)
      this.boardsData.splice(index, 1)
    },

    addTask(boardId: number, task: Task) {
      const index = this.boardsData.findIndex((b) => b.id === boardId)
      this.boardsData[index].tasks.push(task)
    },

    updateTask(boardId: number, task: Task) {
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      const taskIndex = this.boardsData[boardIndex].tasks.findIndex((t) => t.id === task.id)
      this.boardsData[boardIndex].tasks[taskIndex] = task
    },

    setCurrentBoard(boardId: number) {
      const index = this.boardsData.findIndex((b) => b.id === boardId)
      this.currentBoard = this.boardsData[index]
    }
  }
})
