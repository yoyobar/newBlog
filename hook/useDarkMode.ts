import useOptions from '@/config/store';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export const useDarkMode = () => {
    const { data } = useOptions();
    const { setTheme } = useTheme();
    useEffect(() => {
        if (data.theme) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [data, setTheme]);
};
