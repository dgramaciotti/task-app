import prisma, { Task } from './prismaClient'

class TaskService {
  async createTask(task: Task): Promise<Task> {
    const newTask = await prisma.task.create({
      data: task,
    })
    return newTask
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await prisma.task.findMany()
    return tasks
  }

  async getTaskById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    })
    return task
  }

  async updateTask(task: Task): Promise<Task> {
    const updatedTask = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        content: task.content,
        completed: task.completed,
      },
    })
    return updatedTask
  }

  async deleteTask(id: string): Promise<Task> {
    const deletedTask = await prisma.task.delete({
      where: {
        id: id,
      },
    })
    return deletedTask
  }
}

export const taskService = new TaskService()
