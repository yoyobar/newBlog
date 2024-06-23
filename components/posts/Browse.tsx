'use client';
import { IoSearchSharp } from 'react-icons/io5';
import { AllPostsProp } from '@/config/types';
import BrowseCategory from './BrowseCategory';
import { useEffect, useRef, useState } from 'react';
import BrowseContent from './BrowseContent';
import { motion } from 'framer-motion';
import useDebounce from '@/hook/useDebounce';

interface BrowseProps {
    blogs: AllPostsProp[];
    categories: { [key: string]: number };
}

const Browse = ({ blogs, categories }: BrowseProps) => {
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const debouncedSearch = useDebounce(search, 300);
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const sortedBlogs = blogs.sort((a, b) => {
        return b.meta.date.localeCompare(a.meta.date);
    });
    const filteredBlogs = sortedBlogs.filter(
        (blog) =>
            blog.meta.title.toUpperCase().includes(debouncedSearch.toUpperCase()) ||
            blog.meta.tags.find(
                (item) => item.toUpperCase() === debouncedSearch.toUpperCase()
            )
    );

    useEffect(() => {
        if (searchVisible) {
            inputRef.current?.focus();
        } else {
            containerRef.current?.focus();
        }
    }, [searchVisible]);

    const searchButtonHandler = () => {
        setSearchVisible(true);
    };

    const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    const searchBlurHandler = () => {
        setSearchVisible(false);
    };

    const keyboardHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchBlurHandler();
        }
        if (e.key === 'Escape') {
            setSearch('');
            searchBlurHandler();
        }
    };

    const divKeyboardHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.altKey && e.key === 'k') {
            setSearchVisible(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className='outline-none relative'
            onKeyUp={divKeyboardHandler}
            tabIndex={0}
            autoFocus
        >
            {searchVisible && (
                <section>
                    <motion.div
                        animate={{ opacity: [0, 1] }}
                        className='absolute flex justify-center w-full top-5 left-0 z-30'
                    >
                        <motion.input
                            animate={{ width: ['0px', '300px'] }}
                            transition={{ type: 'spring' }}
                            onKeyUp={keyboardHandler}
                            value={search}
                            onBlur={searchBlurHandler}
                            onChange={searchChangeHandler}
                            ref={inputRef}
                            className='fixed p-4 rounded-md border text-3xl'
                            placeholder='검색...'
                        ></motion.input>
                    </motion.div>
                </section>
            )}
            <div className={`relative h-full max-w-[1100px] p-0 mx-auto`}>
                <section
                    className={`${
                        searchVisible && 'invisible '
                    } hidden bg-white md:flex dark:bg-darkInner-background p-4 sticky top-4 mx-auto w-full max-w-[1100px] pl-4 pr-[6rem] gap-x-4 gap-y-4 z-10 flex-wrap shadow-md border rounded-md`}
                >
                    <BrowseCategory categories={categories} />
                </section>
                <nav
                    onClick={searchButtonHandler}
                    className='text-rose-500 absolute right-[7rem] md:right-[10rem] top-[-4rem] md:top-5 z-20 opacity-80'
                >
                    <div className='hover:scale-[115%] transition fixed flex gap-1 text-4xl p-4 rounded-md cursor-pointer z-20'>
                        <div className=' px-2 py-1 rounded-md bg-black text-white dark:text-black dark:bg-white text-2xl'>
                            {searchVisible ? 'Enter' : '⌘+K'}
                        </div>
                        <IoSearchSharp />
                    </div>
                </nav>
                <section className='sm:max-w-[600px] mx-auto w-full md:max-w-[950px] px-4'>
                    <div className='w-full px-2 grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-20 mb-20'>
                        <BrowseContent blogs={filteredBlogs} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Browse;
