import {
    useMutation,
    useQueryClient,
    type MutationFunction,
} from '@tanstack/react-query'
import { useCallback } from 'react'

interface useOptimisticMutationOptions<T> {
    mutationFn: MutationFunction<T, T>
    queryKeys: string[]
}

interface withId {
    id?: string
}

function useOptimisticMutation<T extends withId>({
    mutationFn,
    queryKeys,
}: useOptimisticMutationOptions<T>) {
    const queryClient = useQueryClient()

    const onMutate = useCallback(
        async (newData: T) => {
            await queryClient.cancelQueries({ queryKey: queryKeys })
            const previousData = queryClient.getQueryData<T[]>(queryKeys)
            queryClient.setQueryData<T[]>(
                queryKeys,
                (oldData) =>
                    oldData?.map((t) =>
                        t.id === newData.id ? { ...t, ...newData } : t
                    ) || []
            )
            return { previousData }
        },
        [queryClient, queryKeys]
    )

    const onError = useCallback(
        async (
            err: unknown,
            _: T,
            context: { previousData?: T[] } | undefined
        ) => {
            console.error('Optimistic update failed, rolling back:', err)
            if (context?.previousData) {
                queryClient.setQueryData<T[]>(queryKeys, context.previousData)
            }
        },
        [queryClient, queryKeys]
    )

    const onSettled = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: queryKeys })
    }, [queryClient, queryKeys])

    return useMutation<T, unknown, T, { previousData?: T[] }>({
        mutationFn,
        onMutate,
        onError,
        onSettled,
    })
}

export default useOptimisticMutation
