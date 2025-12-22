import { useRef, useCallback, useLayoutEffect, DependencyList } from 'react';

// 只需要函数引用稳定用 useEventCallback
// 需要绝对稳定的函数引用
// 事件监听器、定时器等需要一次性绑定的场景
// 传递给高度优化的子组件，避免不必要的渲染
// 函数内部需要访问最新状态，但依赖不明确
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
    const ref = useRef<T>(fn);

    // 同步更新 ref，确保每次渲染都能获取最新的函数
    useLayoutEffect(() => {
        ref.current = fn;
    });

    // 返回一个稳定的回调函数
    return useCallback((...args: Parameters<T>) =>
        ref.current(...args), []) as T;
}

// 带依赖的增强版本（可选）
export function useEventCallbackWithDeps<T extends (...args: any[]) => any>(
    fn: T,
    deps: DependencyList
): T {
    const ref = useRef<T>(fn);

    // 只有在依赖变化时才更新 ref
    useLayoutEffect(() => {
        ref.current = fn;
    }, deps);

    return useCallback((...args: Parameters<T>) =>
        ref.current(...args), []) as T;
}

// 需要访问最新状态用 useSyncCallback
export default function useSyncCallback<T extends (...args: any[]) => any>(
    callback: T
): T {
    const ref = useRef<T>(callback);

    // 立即同步更新，不用useEffect
    ref.current = callback;

    return useCallback((...args: Parameters<T>) => {
        // 使用微任务，在同一个事件循环但渲染后执行
        Promise.resolve().then(() => {
            ref.current(...args);
        });
    }, []) as T;
}
