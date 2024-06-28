import PageContainerSmall from '@/components/PageContainerSmall';
import MusicContainer from '@/components/music';
import { siteConfig } from '@/config/siteconfig';
import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Musics | Trouble Wiki',
    description: `Trouble Wiki, 개인 블로그. 음악 플레이어 리스트`,
    openGraph: {
        title: `Musics | Trouble Wiki`,
        images: ['/img/template_og_music.webp'],
        description: 'Trouble Wiki, 개인 블로그. 음악 플레이어 리스트',
    },
    twitter: {
        title: `Musics | Trouble Wiki`,
        images: ['/img/template_og_music.webp'],
        description: 'Trouble Wiki, 개인 블로그. 음악 플레이어 리스트',
    },
    alternates: {
        canonical: `${siteConfig.canonical}/music`,
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
