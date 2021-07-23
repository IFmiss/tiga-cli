export { default as signale } from './lib/logger';
export { warn as logWarn } from './lib/logger';
export { info as logInfo } from './lib/logger';
export { error as logError } from './lib/logger';
export { success as logSuccess } from './lib/logger';

export { default as Spinner } from './lib/spinner';

export { default as checkPkgTool } from './lib/checkPkgTool';

export { default as installDependencies } from './lib/installDependencies';

export { default as installTpl } from './lib/installTpl';
export { default as sh } from './lib/sh';
export { mkdir as mkdir } from './lib/file';
export { exists as exists } from './lib/file';
export { writeFileSync as writeFileSync } from './lib/file';

export { default as initGit } from './lib/initGit';
export { default as timer } from './lib/timer';
export { default as initGitHook } from './lib/initGitHook';
export { default as artFont } from './lib/artFont';

export * as pkgTool from './lib/pkgTool';
