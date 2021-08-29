import { InitShellType } from '../types';

type TemplateExtParams = {
  // 是否使用jsx
  jsx?: boolean;
};

export default function templateExt(
  options: InitShellType,
  params?: TemplateExtParams
) {
  const { template, typescript } = options;
  switch (template) {
    case 'react-components' || 'react-components':
    default:
      return typescript
        ? params?.jsx
          ? 'tsx'
          : 'ts'
        : params?.jsx
        ? 'jsx'
        : 'js';
  }
}
