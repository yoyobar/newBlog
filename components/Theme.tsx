import useOptions from '@/config/store';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useDarkMode } from '@/hook/useDarkMode';

const Theme = () => {
    const { theme, setTheme } = useOptions();
    useDarkMode();

    return (
        <div className='cursor-pointer flex justify-center items-center relative text-white'>
            {theme ? (
                <MdDarkMode
                    title='다크모드'
                    className='hover:text-slate-400 text-4xl transition'
                    onClick={() => setTheme(false)}
                />
            ) : (
                <MdLightMode
                    title='라이트모드'
                    className='hover:text-slate-400 text-4xl transition'
                    onClick={() => setTheme(true)}
                />
            )}
        </div>
    );
};

export default Theme;
