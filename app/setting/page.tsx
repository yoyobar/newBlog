import PageContainer from '@/components/PageContainer';
import SettingPanel from '@/components/setting/SettingPanel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Settings | Trouble Wiki',
    description: `Trouble Wiki, 개인 블로그. 설정을 관리합니다.`,
    openGraph: {
        title: `Settings | Trouble Wiki`,
        images: ['/logo/template_og_settings.webp'],
        description: 'Trouble Wiki, 개인 블로그. 설정을 관리합니다.',
    },
    twitter: {
        title: `Settings | Trouble Wiki`,
        images: ['/logo/template_og_settings.webp'],
        description: 'Trouble Wiki, 개인 블로그. 설정을 관리합니다.',
    },
};

const Setting = () => {
    return (
        <>
            <PageContainer>
                <div className=''>
                    <SettingPanel />
                </div>
            </PageContainer>
        </>
    );
};

export default Setting;
