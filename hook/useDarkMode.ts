import useOptions from '@/config/store';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export const useDarkMode = () => {
    const { theme } = useOptions();
    const { setTheme } = useTheme();
    useEffect(() => {
        if (theme) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [theme, setTheme]);
};
