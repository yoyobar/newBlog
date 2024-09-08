import Alert from './Alert';
import Icon from './Icon';

const Dock = () => {
    return (
        <div className="flex gap-10 m-20">
            <Icon desc={'블로그 글을 확인합니다.'} hidden={false} name="Blog" href="/posts" src="/icon/wiki.svg" />
            <Icon desc={'음악 플레이어를 킵니다.'} hidden={false} name="Music" href="/music" src="/icon/music.svg" />
            <Icon
                className={'bg-slate-700 rounded-full'}
                desc={'Emotree Project'}
                hidden={false}
                name="Emotree"
                href="https://emotree.yoyobar.xyz"
                src="/img/badge_placeholder.png"
            />
            <div className="flex flex-col gap-10 m-10">
                <Alert title={'환영합니다.'} subTitle={`Kim, minsu의 블로그입니다.`} />
            </div>
        </div>
    );
};

export default Dock;
