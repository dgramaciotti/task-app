import { Box, Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { useState, type JSX } from 'react'
import InternalLayout from '../layout/InternalLayout'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../api/getTasks'
import TaskComponent from '../components/Task'
import { createTask } from '../api/createTask'
import useOptimisticMutation from '../hooks/useOptimisticMutation'
import type { Task } from '../models/task'
import CreateTaskDialog from '../components/CreateTaskDialog'

function Home(): JSX.Element {
    const [open, setOpen] = useState(false)
    const mutation = useOptimisticMutation<Partial<Task>>({
        mutationFn: createTask,
        queryKeys: ['tasks'],
    })
    const {
        data: tasks,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
    })

    const openDialog = () => {
        setOpen(true)
    }

    const onCreateTask = async (content: string) => {
        console.log('mutation', content)
        await mutation.mutate({
            content,
            completed: false,
        })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        console.error('Error in homepage loading tasks', error)
        return <div>Error loading tasks</div>
    }
    return (
        <InternalLayout>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Button onClick={openDialog}>
                    <AddCircleIcon></AddCircleIcon>
                    New task
                </Button>
            </Box>
            <Box>
                {tasks?.map((task) => (
                    <TaskComponent key={task.id} task={task} />
                ))}
            </Box>
            <CreateTaskDialog
                open={open}
                onClose={() => setOpen(false)}
                onCreateTask={onCreateTask}
            />
        </InternalLayout>
    )
}

export default Home
