import { Request, Response } from 'express'
import { taskService } from '../../../db/taskService'
import { isValidUuid } from '../../../utils/isUuid';

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await taskService.getAllTasks();
  return res.json(tasks)
}

export const getTask = async (req: Request, res: Response) => {
  const id = req.params.id
  if (!isValidUuid(id)) return res.json({message: 'Invalid uuid'}).status(400)
  const task = await taskService.getTaskById(id)
  if (!task) return res.json({message: 'Task not found'}).status(404)
  return res.json(task)
}

export const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id
  if (!isValidUuid(id)) return res.json({message: 'Invalid uuid'}).status(400)
  const task = await taskService.deleteTask(id)
  return res.json(task)
}

export const createTask = async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body)
  return res.json(task)
}

export const updateTask = async (req: Request, res: Response) => {
  const task = await taskService.updateTask(req.body)
  return res.json(task)
}