import { PropsWithChildren } from 'react';

import * as Icon from './CalloutIcon';

type CalloutType = 'info' | 'warn' | 'danger' | 'default';

interface CalloutProps extends PropsWithChildren {
  type?: CalloutType;
}

interface IconType {
  [key: string]: {
    icon: () => JSX.Element;
    boxClass: string;
  };
}

const metaStyle = {
  default: 'bg-slate-600 text-yellow-200',
  info: 'bg-sky-600 text-blue-200',
  danger: 'bg-rose-600 text-rose-200',
  warn: 'bg-orange-600 text-orange-200',
};

const metadata: IconType = {
  info: {
    icon: Icon.Info,
    boxClass: metaStyle.info,
  },
  danger: {
    icon: Icon.Danger,
    boxClass: metaStyle.danger,
  },
  warn: {
    icon: Icon.Warn,
    boxClass: metaStyle.warn,
  },
  default: {
    icon: Icon.Default,
    boxClass: metaStyle.default,
  },
};

export const Callout = (props: CalloutProps) => {
  const type = props.type || 'default';
  const metaObj = metadata[type];
  const Icon = metaObj.icon;
  const boxClassName = metaObj.boxClass;

  return (
    <div className={`${boxClassName} my-6 flex items-center gap-3 rounded-md px-5 py-4`}>
      <div>
        <Icon />
      </div>
      <div className="font-inherit flex-1 text-white">{props.children}</div>
    </div>
  );
};
