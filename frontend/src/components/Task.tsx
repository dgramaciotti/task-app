import {
    Box,
    Checkbox,
    FormControl,
    IconButton,
    TextField,
    Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import type { Task } from '../models/task'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTask } from '../api/deleteTask'
import { updateTask } from '../api/updateTask'
import useOptimisticMutation from '../hooks/useOptimisticMutation'
import { useInlineEdit } from '../hooks/useInlineEditing'

interface TaskComponentProps {
    task: Task
}

function TaskComponent({ task }: TaskComponentProps) {
    const updateMutation = useOptimisticMutation<Partial<Task>>({
        mutationFn: updateTask,
        queryKeys: ['tasks'],
    })
    const deleteMutation = useOptimisticMutation<Partial<Task>>({
        mutationFn: deleteTask,
        queryKeys: ['tasks'],
    })
    const { register, getValues, formState, watch } = useForm<{
        task: string
        completed: boolean
    }>({
        defaultValues: { task: task.content, completed: task.completed },
    })
    const isCompleted = watch('completed')

    const onDelete = async () => {
        try {
            await deleteMutation.mutate({ id: task.id })
        } catch (e) {
            console.error('error deleting task', e)
        }
    }

    const onUpdate = async () => {
        try {
            await updateMutation.mutate({
                id: task.id,
                content: getValues('task'),
                completed: getValues('completed'),
            })
        } catch (e) {
            console.error('Error updating task')
        }
    }

    const {
        isEditing,
        setIsEditing,
        ref: inputRef,
    } = useInlineEdit<HTMLDivElement>(onUpdate)

    const handleTextClick = () => {
        setIsEditing(true)
    }

    const handleInputBlur = async () => {
        setIsEditing(false)
        await onUpdate()
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Checkbox
                checked={isCompleted}
                {...register('completed', { onChange: onUpdate })}
            />
            <Box ref={inputRef} sx={{ flexGrow: 1, cursor: 'pointer' }}>
                {!isEditing && (
                    <Typography
                        sx={{
                            textDecoration: isCompleted
                                ? 'line-through'
                                : 'none',
                        }}
                        onClick={handleTextClick}
                    >
                        {getValues('task')}
                    </Typography>
                )}
                {isEditing && (
                    <FormControl fullWidth>
                        <TextField
                            label="Task"
                            type="text"
                            error={!!formState.errors.task}
                            helperText={formState.errors.task?.message}
                            autoFocus
                            {...register('task', {
                                minLength: {
                                    value: 1,
                                    message: 'task cannot be empty',
                                },
                                onBlur: handleInputBlur,
                            })}
                        />
                    </FormControl>
                )}
            </Box>
            <IconButton onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}

export default TaskComponent
