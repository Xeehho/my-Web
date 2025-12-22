'use client';
import { useCountStore } from '@/app/stores/useThemeStore';
import LiquidEther from '@/components/ui/background/LiquidEther';
import StaggeredMenu from '@/components/ui/unit/StaggeredMenu';
import styles from './style.module.css';


const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
];


const Topbg = () => {
    // 或者只选择需要的部分（推荐，避免不必要的重渲染）
    // const count = useStore((state) => state.count)
    // const increment = useStore((state) => state.increment)
    // const decrement = useStore((state) => state.decrement)
    // const reset = useStore((state) => state.reset)

    // const {count, increment, decrement, reset} = useStore((state) => ({
    //     count: state.count,
    //     increment: state.increment,
    //     decrement: state.decrement,
    //     reset: state.reset,
    // }))

    const { count, increment, decrement, reset } = useCountStore()

    return (
        // <div onClick={increment}>{count}</div>
        <div style={{ width: '100%', height: 600, position: 'relative' }}>
            {/* 背景 */}
            <div className={styles.liquidEther}>
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>
            {/* 右边菜单组件 */}
            <div style={{ height: '100vh' }}>
                <StaggeredMenu
                    position="left"
                    items={menuItems}
                    socialItems={socialItems}
                    displaySocials={true}
                    displayItemNumbering={true}
                    menuButtonColor="#fff"
                    openMenuButtonColor="#fff"
                    changeMenuColorOnOpen={true}
                    colors={['#B19EEF', '#5227FF']}
                    logoUrl="/path-to-your-logo.svg"
                    accentColor="#ff6b6b"
                    onMenuOpen={() => console.log('Menu opened')}
                    onMenuClose={() => console.log('Menu closed')}
                />
            </div>
        </div>
    )
}
export default Topbg;