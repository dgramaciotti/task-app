import type { Task } from '../models/task'

const deleteTask = async (payload: Partial<Task>): Promise<Task> => {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE
        const resp = await fetch(`${baseUrl}/tasks/${payload.id}`, {
            method: 'DELETE',
        })
        if (!resp.ok) {
            throw new Error('Failed to fetch with status: ' + resp.status)
        }
        return await resp.json()
    } catch (e) {
        console.error(e)
        throw e
    }
}

export { deleteTask }
