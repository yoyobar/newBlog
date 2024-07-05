import Alert from './Alert';
import Icon from './Icon';

const Dock = () => {
    return (
        <div className="flex gap-10 m-20">
            <Icon desc={'블로그 글을 확인합니다.'} hidden={false} name="Blog" href="/posts" src="/icon/wiki.svg" />
            <Icon desc={'음악 플레이어를 킵니다.'} hidden={true} name="Music" href="/music" src="/icon/music.svg" />
            <div className="flex flex-col gap-10 m-10">
                <Alert
                    title={'환영합니다.'}
                    subTitle={`${new Date().toLocaleDateString()} 
                    현재, 블로그는 개발 진행중입니다.`}
                />
            </div>
        </div>
    );
};

export default Dock;
