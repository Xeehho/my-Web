'use client';
import { useState, useEffect } from 'react';
import styles from './style.module.css';

interface NavItem {
    label: string;
    href: string;
}

interface TopNavProps {
    navItems?: NavItem[];
}

const TopNav = ({ navItems }: TopNavProps) => {
    const [scrolled, setScrolled] = useState(false);
    const defaultNavItems: NavItem[] = [
        { label: '简介', href: '/about' },
        { label: '电影', href: '/movies' },
        { label: '游戏', href: '/games' },
        { label: '动漫', href: '/anime' }
    ];

    const items = navItems || defaultNavItems;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navContainer} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.logo}>
                <span>MyLogo</span>
            </div>
            <div className={styles.navItemsWrapper}>
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className={styles.navItem}
                    >
                        <span className={styles.navText}>{item.label}</span>
                    </a>
                ))}
            </div>
            <div className={styles.themeToggle}>
                <span>🌙</span>
            </div>
        </nav>
    );
}

export default TopNav;