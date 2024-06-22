'use client';

import { ThemeProvider } from 'next-themes';
import { useDarkMode } from '@/hook/useDarkMode';

const Provider = ({ children }: { children: React.ReactNode }) => {
    useDarkMode();
    return <ThemeProvider attribute='class'>{children}</ThemeProvider>;
};

export default Provider;
