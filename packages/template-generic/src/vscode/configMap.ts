import vscodeConfig from './settings.json';

export default function vscode() {
  return {
    ['.vscode/settings.json']: JSON.stringify(vscodeConfig, null, 2)
  };
}
