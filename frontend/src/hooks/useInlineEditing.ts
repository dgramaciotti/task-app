import { useState, useRef, useEffect, type RefObject } from 'react'

export function useInlineEdit<T extends HTMLElement>(
    onFinishEditing: () => void
): {
    isEditing: boolean
    setIsEditing: (val: boolean) => void
    ref: RefObject<T | null>
} {
    const [isEditing, setIsEditing] = useState(false)
    const ref = useRef<T>(null)

    useEffect(() => {
        async function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsEditing(false)
                await onFinishEditing()
            }
        }

        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isEditing, onFinishEditing])

    return { isEditing, setIsEditing, ref }
}
