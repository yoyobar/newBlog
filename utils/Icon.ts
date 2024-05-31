//? SVG 파일 전체 임포트 기능
interface IconType {
    [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function importSvg(r: __WebpackModuleApi.RequireContext): IconType {
    let icons: IconType = {};
    r.keys().forEach((item) => {
        const iconName = item
            .replace('./', '') // "./" 제거
            .replace('.svg', '') // ".svg" 제거
            .replace('-16', '') // "-16" 제거
            .replace('-12', '') // "-12" 제거
            .replace(/-/g, '_'); // "-"를 "_"로 변경
        icons[iconName] = r(item).default;
    });
    return icons;
}

export const Icon = importSvg(require.context('../public/icons', false, /\.svg$/) as __WebpackModuleApi.RequireContext);
