import type { Task } from '../models/task'

const getTasks = async (): Promise<Task[]> => {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE
        const resp = await fetch(`${baseUrl}/tasks`)
        if (!resp.ok) {
            throw new Error('Failed to fetch with status: ' + resp.status)
        }
        return await resp.json()
    } catch (e) {
        console.error(e)
        throw e
    }
}

export { getTasks }
