import renderContextFile from '../utils/render';
import compileIndex from './template/index';
import * as fsExtra from 'fs-extra';
import { RenderTemplateOptions } from 'tiga-cli';

export default function renderRCC(options: RenderTemplateOptions) {
  const { name, path, typescript } = options;

  const reactExt = typescript ? 'tsx' : 'jsx';

  const TPL_MAP = {
    [`${name}/index.${reactExt}`]: renderContextFile(compileIndex, options)
  };

  for (const [k, v] of Object.entries(TPL_MAP)) {
    try {
      fsExtra.writeFileSync(`${path}/${k}`, v);
    } catch (e) {
      console.error(e);
      fsExtra.rmdir(path);
    }
  }
}
