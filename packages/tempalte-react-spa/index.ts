import renderContextFile from './utils/render';
import compileIndex from './template/index';
import pkg from './template/package.json';
import * as fsExtra from 'fs-extra';
import { RenderTemplateOptions } from 'tiga-cli';

export default function renderRCC(options: RenderTemplateOptions) {
  const { projectPath, typescript } = options;

  const reactExt = typescript ? 'tsx' : 'jsx';

  const TPL_MAP = {
    [`index.${reactExt}`]: renderContextFile(compileIndex, options),
    [`package.json`]: JSON.stringify(pkg, null, 2)
  };

  for (const [k, v] of Object.entries(TPL_MAP)) {
    try {
      fsExtra.writeFileSync(`${projectPath}/${k}`, v);
    } catch (e) {
      console.error(e);
      fsExtra.rmdir(projectPath);
    }
  }
}
