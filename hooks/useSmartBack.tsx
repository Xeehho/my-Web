// hooks/useSmartBack.ts
'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface UseSmartBackOptions {
    /** 当没有历史记录时的回退URL，默认 '/' */
    fallbackUrl?: string;
    /** 是否在组件挂载时检查历史记录 */
    checkHistoryOnMount?: boolean;
}

interface UseSmartBackReturn {
    /** 是否可以返回（有历史记录） */
    canGoBack: boolean;
    /** 执行返回操作 */
    handleBack: () => void;
    /** 返回的页面路径（如果可获取） */
    previousPath?: string | null;
    /** 执行带确认的返回操作 */
    handleBackWithConfirm?: (message?: string) => void;
}

/**
 * 智能返回 Hook
 * 提供返回上一页的功能，自动处理边界情况
 */
const useBack = (options: UseSmartBackOptions = {}): UseSmartBackReturn => {
    const {
        fallbackUrl = '/',
        checkHistoryOnMount = true,
    } = options;

    const router = useRouter();
    const pathname = usePathname();
    const [canGoBack, setCanGoBack] = useState(false);
    const [previousPath, setPreviousPath] = useState<string | null>(null);

    // 检查浏览器历史记录
    const checkHistory = useCallback(() => {
        if (typeof window !== 'undefined') {
            const isHomePage = pathname === '/';
            const hasHistory = window.history.length > 1 && !isHomePage;
            setCanGoBack(hasHistory);

            // 尝试从 sessionStorage 获取上一个路径
            const storedPath = sessionStorage.getItem('previous_path');
            setPreviousPath(storedPath);

            return hasHistory;
        }
        return false;
    }, []);

    // 记录当前路径
    const recordCurrentPath = useCallback(() => {
        if (typeof window !== 'undefined' && pathname) {
            const currentPath = window.location.pathname;
            const previous = sessionStorage.getItem('current_path');
            if (previous && previous !== currentPath) {
                sessionStorage.setItem('previous_path', previous);
            }
            sessionStorage.setItem('current_path', currentPath);
        }
    }, [pathname]);

    // 执行返回操作
    const handleBack = useCallback(() => {
        if (checkHistory()) {
            // 有历史记录，使用浏览器返回
            router.back();
        } else {
            // 没有历史记录，跳转到指定页面
            router.push(fallbackUrl);
        }
    }, [router, fallbackUrl, checkHistory]);

    // 带确认的返回
    const handleBackWithConfirm = useCallback((message: string = '确定要离开当前页面吗？') => {
        if (confirm(message)) {
            handleBack();
        }
    }, [handleBack]);

    // 组件挂载和路径变化时更新状态
    useEffect(() => {
        if (checkHistoryOnMount) {
            checkHistory();
        }
    }, [checkHistory, checkHistoryOnMount, pathname]);

    // 记录路径变化
    useEffect(() => {
        recordCurrentPath();
    }, [recordCurrentPath]);

    return {
        /** 是否可以返回（有历史记录） */
        canGoBack,
        /** 执行返回操作 */
        handleBack,
        /** 返回的页面路径（如果可获取） */
        previousPath,
        /** 执行带确认的返回操作 */
        handleBackWithConfirm,
        // 额外的方法可以在这里扩展
    };
}

/**
 * 高级版本：支持更多功能
 * @param return canGoBack 是否可以返回（有历史记录）
 * @param return handleBack 执行返回操作
 * @param return previousPath 返回的页面路径（如果可获取）
 * @param return backTo 返回到指定页面的方法
 * @param return backToHome 返回到首页的方法
 * @param return openPreviousInNewTab 在新标签页打开上一页的方法
 * @param return handleBackWithConfirm 执行带确认的返回操作
 */
export function useSmartBack(options: UseSmartBackOptions = {}) {
    const basic = useBack(options);
    const router = useRouter();

    // 返回到指定页面
    const backTo = useCallback((path: string) => {
        router.push(path);
    }, [router]);

    // 返回到首页
    const backToHome = useCallback(() => {
        router.push('/');
    }, [router]);

    // 在新标签页打开上一页
    const openPreviousInNewTab = useCallback(() => {
        if (basic.previousPath) {
            window.open(basic.previousPath, '_blank');
        }
    }, [basic.previousPath]);

    return {
        ...basic,
        /** 返回到指定页面 */
        backTo,
        /** 返回到首页 */
        backToHome,
        /** 在新标签页打开上一页 */
        openPreviousInNewTab,
    };
}