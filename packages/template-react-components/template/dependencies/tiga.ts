import type { InitShellType } from '@tiga-cli/tpl-core';

export default function tigaDependencies ({ version }: InitShellType) {
  return {
    devDependencies: {
      '@tiga-cli/cli': version
    },
    dependencies: {}
  }
}
