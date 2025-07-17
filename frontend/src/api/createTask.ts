import type { Task } from '../models/task'

const createTask = async (payload: Partial<Task>): Promise<Task> => {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE
        const resp = await fetch(`${baseUrl}/tasks`, {
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
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

export { createTask }
