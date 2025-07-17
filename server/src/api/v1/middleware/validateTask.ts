import { NextFunction, Request, Response } from 'express'
import z, { ZodError } from 'zod'

const taskSchema = z.object({
  id: z.uuid().optional(),
  content: z.string(),
  completed: z.boolean(),
})

const validateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    taskSchema.parse(req.body)
    next()
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ errors: e.message })
    }
    next(e)
  }
}

export default validateTask
