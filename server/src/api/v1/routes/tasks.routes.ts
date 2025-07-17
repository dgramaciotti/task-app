import { Router } from 'express'
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '../controllers/tasks.controller'
import validateTask from '../middleware/validateTask'

const router = Router()

/**
 * @openapi
 * /tasks:
 *   get:
 *     description: Get all tasks
 *     responses:
 *       200:
 *         description: Returns all existing tasks
 */
router.get('/tasks', getTasks)
router.get('/tasks/:id', getTask)
router.post('/tasks', validateTask, createTask)
router.delete('/tasks/:id', deleteTask)
router.patch('/tasks/:id', validateTask, updateTask)

export default router
