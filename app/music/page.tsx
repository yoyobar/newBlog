import PageContainerSmall from '@/components/PageContainerSmall';
import MusicContainer from '@/components/music';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Musics | Trouble Wiki',
    description: `Trouble Wiki, 개인 블로그. 음악 플레이어 리스트`,
    openGraph: {
        title: `Musics | Trouble Wiki`,
        images: ['/logo/template_og_archives.webp'],
        description: 'Trouble Wiki, 개인 블로그. 음악 플레이어 리스트',
    },
    twitter: {
        title: `Musics | Trouble Wiki`,
        images: ['/logo/template_og_archives.webp'],
        description: 'Trouble Wiki, 개인 블로그. 음악 플레이어 리스트',
    },
};

const Home: React.FC = () => {
    return (
        <PageContainerSmall>
            <MusicContainer />
        </PageContainerSmall>
    );
};

export default Home;
