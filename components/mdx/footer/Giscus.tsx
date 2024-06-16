'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Giscus() {
    const ref = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();

    const theme = resolvedTheme === 'dark' ? 'dark_dimmed' : 'light';

    useEffect(() => {
        if (!ref.current || ref.current.hasChildNodes()) return;

        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://giscus.app/client.js';
        scriptElem.async = true;
        scriptElem.crossOrigin = 'anonymous';

        scriptElem.setAttribute('data-repo', 'yoyobar/newBlog');
        scriptElem.setAttribute('data-repo-id', 'R_kgDOMC9eWQ');
        scriptElem.setAttribute('data-category', 'Comments');
        scriptElem.setAttribute('data-category-id', 'DIC_kwDOMC9eWc4CgHxe');
        scriptElem.setAttribute('data-mapping', 'pathname');
        scriptElem.setAttribute('data-strict', '0');
        scriptElem.setAttribute('data-reactions-enabled', '0');
        scriptElem.setAttribute('data-emit-metadata', '0');
        scriptElem.setAttribute('data-input-position', 'bottom');
        scriptElem.setAttribute('data-theme', theme);
        scriptElem.setAttribute('data-lang', 'ko');

        ref.current.appendChild(scriptElem);
    }, [theme]);

    useEffect(() => {
        const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
        iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
    }, [theme]);

    return <section ref={ref} />;
}
