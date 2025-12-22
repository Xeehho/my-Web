import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow' // 注意路径

interface StoreState {
    count: number
    name: string
    increment: () => void
    decrement: () => void
    reset: () => void
    logCount: () => void
    updateName: (name: string) => void
}

const useStore = create<StoreState>((set, get) => ({
    count: 15,
    name: 'Zustand',
    updateName: (name) => set({ name }),
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
    logCount: () => {
        const currentCount = get().count
        console.log('当前计数:', currentCount)
    },
}))

export const useCountStore = () => {
    return useStore(
        useShallow((state) => ({
            count: state.count,
            increment: state.increment,
            decrement: state.decrement,
            reset: state.reset,
        }))
    )
}