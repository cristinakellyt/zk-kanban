import { defineStore } from 'pinia'
import type { Board, Task, SubTask } from '@/types/appTypes'

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
    },

    updateTaskDetail(
      boardId: number,
      taskId: number,
      newSelectedColumnId: number,
      oldColumnId: number,
      subTasks: SubTask[]
    ) {
      //find current board index
      const boardIndex = this.boardsData.findIndex((b) => b.id === boardId)
      //find current column index
      const columnIndex = this.boardsData[boardIndex].columns.findIndex((c) => c.id === oldColumnId)
      //find current task index
      const taskIndex = this.boardsData[boardIndex].columns[columnIndex].tasks.findIndex(
        (t) => t.id === taskId
      )
      //update subtasks
      this.boardsData[boardIndex].columns[columnIndex].tasks[taskIndex].subTasks = subTasks

      //update task column
      if (newSelectedColumnId !== oldColumnId) {
        this.updateTaskColumn(boardId, taskId, newSelectedColumnId, oldColumnId)
      }
    }
  }
})
