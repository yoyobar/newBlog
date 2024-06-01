import Dock from '@/components/Dock';
import Header from '@/components/Header';
import Snowfall from '@/components/SnowFall';

export default function Home() {
    return (
        <main
            style={{
                backgroundImage: `url(/logo/main-bg.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className='w-full h-full bg-background relative'
        >
            <Snowfall />
            <Header />
        </main>
    );
}
