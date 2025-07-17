import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import type { JSX } from 'react'

interface CreateTaskDialogProps {
    open: boolean
    onClose: () => void
    onCreateTask: (content: string) => void
}

function CreateTaskDialog({
    open,
    onClose,
    onCreateTask,
}: CreateTaskDialogProps): JSX.Element {
    const { register, getValues, reset, formState } = useForm<{
        content: string
    }>()

    const handleCreate = async () => {
        console.log('create')
        const content = getValues('content')
        await onCreateTask(content)
        reset()
        onClose()
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add task</DialogTitle>
            <DialogContent>
                <FormControl>
                    <TextField
                        type="text"
                        placeholder="Task"
                        {...register('content', { required: true })}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={!formState.isValid} onClick={handleCreate}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateTaskDialog
